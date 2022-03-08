import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import type { Editor } from '@toast-ui/editor';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KatexOptions } from 'ngx-markdown-latex';

declare function renderMathInElement(elem: Element, options?: KatexOptions): void;

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

  @ViewChild('editor') editorDiv!: ElementRef;

  disabled = false;

  touched = false;

  loading = true;

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

  options: KatexOptions = {
    throwOnError: false,
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
    ],
  };

  renderMath(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    renderMathInElement(div, this.options);
    return div.innerHTML;
  }

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    import('@toast-ui/editor').then(({ Editor }) => {
      this.ngZone.run(() => {
        this.loading = false;
      });
      this.editorDiv.nativeElement.innerHTML = '';
      this.editor = new Editor({
        el: this.editorDiv.nativeElement,
        previewStyle: 'vertical',
        initialValue: this.markdown,
        height: 'auto',
        plugins: [[codeSyntaxHighlight, { highlighter: window.Prism }]],
        events: {
          load: (editor) => {
            renderMathInElement(editor.getEditorElements().mdPreview, this.options);
          },
          change: () => {
            this.editor.on('change', () => {
              this.markAsTouched();
              this.markdown = this.editor.getMarkdown();
              this.markdownChange.emit(this.markdown);
              renderMathInElement(this.editor.getEditorElements().mdPreview, this.options);
              this.onChange(this.markdown);
            });
          },
        },
        customHTMLRenderer: {
          softbreak: (_, { options }) => {
            return {
              type: 'html',
              content: options.softbreak,
            };
          },
        },
      });
    });
  }
}
