import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { SubmissionsTableComponent } from './submissions-table.component';
import { FilesTableComponent } from './upload-dialog/files-table/files-table.component';
import { FilesizePipe } from '../../pipe/filesize.pipe';

@NgModule({
  declarations: [
    SubmissionsTableComponent,
    UploadDialogComponent,
    FilesTableComponent,
    FilesizePipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [SubmissionsTableComponent],
})
export class SubmissionsTableModule {}
