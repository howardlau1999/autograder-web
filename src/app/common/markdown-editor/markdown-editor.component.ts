import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Editor, { PluginContext } from '@toast-ui/editor';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'katex/dist/katex.min.css';

import codeSyntaxHighlight, { PluginOptions } from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-clojure';
import katex from 'katex';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

function renderMath(str: string, display: boolean = false) {
  try {
    return katex.renderToString(str, {
      throwOnError: true,
      displayMode: display,
    });
  } catch (e) {
    return `<code>${e}</code>`;
  }
}

function latexPlugin() {
  const toHTMLRenderers = {
    latex(node: any) {
      const html = renderMath(node.literal, true);
      return [
        { type: 'openTag', tagName: 'div', outerNewLine: true },
        { type: 'html', content: html },
        { type: 'closeTag', tagName: 'div', outerNewLine: true },
      ];
    },
  };
  return { toHTMLRenderers };
}

function getInlineMath(content: string) {
  return content.replace(/\$(.+)\$/gu, (_, latex: string) => renderMath(latex));
}

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MarkdownEditorComponent,
    },
  ],
})
export class MarkdownEditorComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  editor!: Editor;

  @Input() markdown: string = '';

  @Output() markdownChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('editor') editorEl!: ElementRef;

  disabled = false;

  touched = false;

  onChange = (_: string) => {};

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(markdown: string) {
    this.markdown = markdown;
    this.markdownChange.emit(this.markdown);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.editor = new Editor({
      el: this.editorEl.nativeElement,
      previewStyle: 'vertical',
      initialValue: this.markdown,
      plugins: [
        [codeSyntaxHighlight, { highlighter: Prism }],
        // @ts-ignore
        latexPlugin,
      ],
      customHTMLRenderer: {
        text(node) {
          return [
            {
              type: 'html',
              content: getInlineMath(node.literal || ''),
            },
          ];
        },
      },
    });
    this.editor.off('change');
    this.editor.on('change', () => {
      this.markAsTouched();
      this.markdown = this.editor.getMarkdown();
      this.markdownChange.emit(this.markdown);
      this.onChange(this.markdown);
    });
  }
}
