import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CourseFormComponent } from './course-form.component';
import { MarkdownEditorModule } from '../markdown-editor/markdown-editor.module';

@NgModule({
  declarations: [CourseFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MarkdownEditorModule,
    MatInputModule,
  ],
  exports: [CourseFormComponent],
})
export class CourseFormModule {}
