import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AssignmentFormComponent } from './assignment-form.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';
import { MarkdownEditorModule } from '../markdown-editor/markdown-editor.module';

@NgModule({
  declarations: [AssignmentFormComponent],
  imports: [
    CommonModule,
    DatetimePickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MarkdownEditorModule,
    MatTooltipModule,
  ],
  exports: [AssignmentFormComponent],
})
export class AssignmentFormModule {}
