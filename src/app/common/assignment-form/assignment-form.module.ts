import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { ProgrammingAssignmentFormComponent } from './programming/programming-assignment-form.component';
import { DatetimePickerModule } from '../datetime-picker/datetime-picker.module';
import { MarkdownEditorModule } from '../markdown-editor/markdown-editor.module';

@NgModule({
  declarations: [ProgrammingAssignmentFormComponent],
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
  exports: [ProgrammingAssignmentFormComponent],
})
export class AssignmentFormModule {}
