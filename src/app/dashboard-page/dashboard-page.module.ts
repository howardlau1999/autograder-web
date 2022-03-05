import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { CourseJoinDialogComponent } from './course-join-dialog/course-join-dialog.component';
import { CourseCreateDialogComponent } from './course-create-dialog/course-create-dialog.component';
import { MarkdownEditorModule } from '../common/markdown-editor/markdown-editor.module';

@NgModule({
  declarations: [DashboardPageComponent, CourseJoinDialogComponent, CourseCreateDialogComponent],
  imports: [
    CommonModule,
    DashboardPageRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MarkdownEditorModule,
    ReactiveFormsModule,
  ],
})
export class DashboardPageModule {}
