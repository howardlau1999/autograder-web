import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MarkdownEditorComponent } from './markdown-editor.component';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatProgressSpinnerModule],
  exports: [MarkdownEditorComponent],
})
export class MarkdownEditorModule {}
