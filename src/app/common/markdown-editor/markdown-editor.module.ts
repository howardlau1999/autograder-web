import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownEditorComponent } from './markdown-editor.component';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [MarkdownEditorComponent],
})
export class MarkdownEditorModule {}
