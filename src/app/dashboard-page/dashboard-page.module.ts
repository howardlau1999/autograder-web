import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { CourseJoinDialogComponent } from './course-join-dialog/course-join-dialog.component';
import { CourseCreateDialogComponent } from './course-create-dialog/course-create-dialog.component';
import { MarkdownEditorModule } from '../common/markdown-editor/markdown-editor.module';
import { CourseFormModule } from '../common/course-form/course-form.module';

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
    CourseFormModule,
  ],
})
export class DashboardPageModule {}
