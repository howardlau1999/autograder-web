import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MarkdownModule } from 'ngx-markdown-latex';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { SubmissionsComponent } from './submissions/submissions.component';
import { AssignmentEditDialogComponent } from './submissions/assignment-edit-dialog/assignment-edit-dialog.component';
import { SubmissionsPageRoutingModule } from './submissions-page-routing.module';
import { ConfirmDialogModule } from '../../common/confirm-dialog/confirm-dialog.module';
import { AssignmentFormModule } from '../../common/assignment-form/assignment-form.module';
import { SubmissionsTableModule } from '../../common/submissions-table/submissions-table.module';

@NgModule({
  declarations: [AssignmentEditDialogComponent, SubmissionsComponent],
  imports: [
    CommonModule,
    SubmissionsPageRoutingModule,
    SubmissionsTableModule,

    AssignmentFormModule,
    ConfirmDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MarkdownModule.forChild(),
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
})
export class SubmissionsPageModule {}
