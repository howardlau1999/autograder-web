import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatSortModule } from '@angular/material/sort';
import { SafeMarkdownModule } from '../common/safe-markdown/safe-markdown.module';
import { CoursePageRoutingModule } from './course-page-routing.module';
import { CoursePageComponent } from './course-page.component';
import { MembersComponent } from './members-page/members/members.component';
import { AssignmentsComponent } from './assignments-page/assignments/assignments.component';
import { RoleSelectComponent } from './members-page/members/role-select/role-select.component';
import { AddMemberDialogComponent } from './members-page/members/add-member-dialog/add-member-dialog.component';
import { BatchAddMemberDialogComponent } from './members-page/members/batch-add-member-dialog/batch-add-member-dialog.component';
import { RemoveMemberDialogComponent } from './members-page/members/remove-member-dialog/remove-member-dialog.component';
import { CourseEditDialogComponent } from './assignments-page/assignments/course-edit-dialog/course-edit-dialog.component';
import { AssignmentsTableComponent } from './assignments-page/assignments/assignments-table/assignments-table.component';
import { AssignmentCreateDialogComponent } from './assignments-page/assignments/assignment-create-dialog/assignment-create-dialog.component';
import { AssignmentFormModule } from '../common/assignment-form/assignment-form.module';
import { MarkdownEditorModule } from '../common/markdown-editor/markdown-editor.module';
import { CourseFormModule } from '../common/course-form/course-form.module';

@NgModule({
  declarations: [
    CoursePageComponent,
    MembersComponent,
    AssignmentsComponent,
    RoleSelectComponent,
    AddMemberDialogComponent,
    BatchAddMemberDialogComponent,
    RemoveMemberDialogComponent,
    CourseEditDialogComponent,
    AssignmentsTableComponent,
    AssignmentCreateDialogComponent,
  ],
  imports: [
    CommonModule,
    CoursePageRoutingModule,
    AssignmentFormModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatListModule,
    MatToolbarModule,
    SafeMarkdownModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MarkdownEditorModule,
    CourseFormModule,
  ],
})
export class CoursePageModule {}
