import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
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
import { AssignmentPageRoutingModule } from './assignment-page-routing.module';
import { AssignmentPageComponent } from './assignment-page.component';
import { InspectionComponent } from './inspection/inspection.component';
import { InspectionTableComponent } from './inspection/inspection-table/inspection-table.component';
import { AssignmentFormModule } from '../common/assignment-form/assignment-form.module';
import { AssignmentEditDialogComponent } from './submissions/assignment-edit-dialog/assignment-edit-dialog.component';
import { SubmissionsTableComponent } from './submissions/submissions-table/submissions-table.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { UploadDialogComponent } from './submissions/upload-dialog/upload-dialog.component';
import { FilesTableComponent } from './submissions/upload-dialog/files-table/files-table.component';
import { FilesizePipe } from '../pipe/filesize.pipe';
import { ConfirmDialogModule } from '../common/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    AssignmentPageComponent,
    InspectionComponent,
    InspectionTableComponent,
    AssignmentEditDialogComponent,
    SubmissionsTableComponent,
    SubmissionsComponent,
    LeaderboardComponent,
    UploadDialogComponent,
    FilesTableComponent,
    FilesizePipe,
  ],
  imports: [
    CommonModule,
    AssignmentPageRoutingModule,
    AssignmentFormModule,
    ConfirmDialogModule,
    MatToolbarModule,
    MatListModule,
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
export class AssignmentPageModule {}
