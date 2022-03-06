import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MarkdownModule } from 'ngx-markdown-latex';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
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
    MarkdownModule.forChild(),
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MarkdownEditorModule,
  ],
})
export class CoursePageModule {}
