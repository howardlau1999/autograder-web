import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { SafeMarkdownModule } from '../../common/safe-markdown/safe-markdown.module';
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
    SafeMarkdownModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
})
export class SubmissionsPageModule {}
