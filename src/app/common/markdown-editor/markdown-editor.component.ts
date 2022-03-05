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
import Editor from '@toast-ui/editor';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'katex/dist/katex.min.css';

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-clojure';
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.editor = new Editor({
        el: this.editorEl.nativeElement,
        previewStyle: 'vertical',
        initialValue: this.markdown,
        height: 'auto',
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
        events: {
          load: (editor) => {
            renderMathInElement(editor.getEditorElements().mdPreview, this.options);
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
      this.editor.off('change');
      this.editor.on('change', () => {
        this.markAsTouched();
        this.markdown = this.editor.getMarkdown();
        this.markdownChange.emit(this.markdown);
        renderMathInElement(this.editor.getEditorElements().mdPreview, this.options);
        this.onChange(this.markdown);
      });
    });
  }
}
