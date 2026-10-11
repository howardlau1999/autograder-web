import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export interface KatexDelimiter {
  left: string;
  right: string;
  display: boolean;
}

// The subset of KaTeX auto-render options this app uses.
export interface KatexOptions {
  delimiters?: KatexDelimiter[];
  throwOnError?: boolean;
  errorColor?: string;
}

// KaTeX auto-render and Prism are loaded as plain scripts (see index.html and
// the assets section of angular.json), so they are reached through globals.
declare function renderMathInElement(elem: Element, options?: KatexOptions): void;
declare const Prism: { highlightAllUnder(element: Element): void } | undefined;

// A private DOMPurify instance so the hook cannot leak into other users of
// the library. The only <input> that may survive is a GFM task-list
// checkbox, and it is kept inert; anything else (text or password fields
// that could pose as a login form) is removed.
const purifier = DOMPurify();
purifier.addHook('uponSanitizeElement', (node, data) => {
  if (data.tagName !== 'input' || !(node instanceof Element)) {
    return;
  }
  if (node.getAttribute('type') !== 'checkbox') {
    node.parentNode?.removeChild(node);
    return;
  }
  node.setAttribute('disabled', '');
});

export const DEFAULT_KATEX_OPTIONS: KatexOptions = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
  ],
  throwOnError: false,
  errorColor: '#cc0000',
};

// Renders markdown from the server without ever handing unsanitized HTML to
// the DOM. Pipeline: marked -> DOMPurify -> innerHTML -> KaTeX auto-render and
// Prism on the resulting DOM. KaTeX and Prism only read text nodes and emit
// their own markup, so running them after sanitization is safe and keeps the
// inline styles KaTeX needs, which an HTML sanitizer would strip.
@Component({
  selector: 'app-safe-markdown',
  template: '<div #container class="safe-markdown"></div>',
  // The rendered markup is not part of the template, so styles for it have
  // to be global; keep encapsulation off so the host class can be targeted.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class SafeMarkdownComponent implements OnChanges, AfterViewInit {
  @Input() data: string | null | undefined;

  @Input() katex = false;

  @Input() katexOptions: KatexOptions = DEFAULT_KATEX_OPTIONS;

  // Markdown written by course staff keeps inline styles and task-list
  // checkboxes. Student submissions get neither: inline styles can overlay or
  // reposition content (UI redressing) and form controls make phishing forms.
  @Input() staffContent = false;

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.render();
  }

  ngOnChanges(): void {
    if (this.viewReady) {
      this.render();
    }
  }

  static sanitize(html: string, staffContent: boolean): string {
    // <style> elements could restyle the whole page (inline styles are bounded
    // to their element); forms and buttons have no legitimate use in either
    // kind of content. <input> stays for staff so GFM task lists render, but
    // the hook below reduces it to disabled checkboxes.
    const forbiddenTags = ['style', 'form', 'button', 'select', 'textarea'];
    if (!staffContent) {
      forbiddenTags.push('input');
    }
    return purifier.sanitize(html, {
      // HTML only: no SVG or MathML from the input. KaTeX adds its own MathML
      // to the DOM afterwards, which is unaffected.
      USE_PROFILES: { html: true },
      FORBID_TAGS: forbiddenTags,
      FORBID_ATTR: staffContent ? [] : ['style'],
    });
  }

  private render(): void {
    const element = this.container.nativeElement;
    const markdown = this.data ?? '';
    if (!markdown) {
      element.innerHTML = '';
      return;
    }
    const html = marked.parse(markdown, { async: false });
    element.innerHTML = SafeMarkdownComponent.sanitize(html, this.staffContent);
    if (this.katex && typeof renderMathInElement === 'function') {
      renderMathInElement(element, this.katexOptions);
    }
    if (typeof Prism !== 'undefined' && typeof Prism.highlightAllUnder === 'function') {
      Prism.highlightAllUnder(element);
    }
  }
}
