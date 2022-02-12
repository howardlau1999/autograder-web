import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSortModule } from '@angular/material/sort';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CoursePageComponent } from './course-page/course-page.component';
import { SubmissionPageComponent } from './submission-page/submission-page.component';
import { UploadDialogComponent } from './assignment-page/upload-dialog/upload-dialog.component';
import { FilesTableComponent } from './assignment-page/upload-dialog/files-table.component';
import { LeaderboardComponent } from './assignment-page/leaderboard/leaderboard.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ReportComponent } from './submission-page/report/report.component';
import { FilesComponent } from './submission-page/files/files.component';
import { CourseCreateDialogComponent } from './dashboard-page/course-create-dialog/course-create-dialog.component';
import { AssignmentCreateDialogComponent } from './course-page/assignment-create-dialog/assignment-create-dialog.component';
import { JoinDialogComponent } from './dashboard-page/join-dialog/join-dialog.component';
import { MembersComponent } from './course-page/members/members.component';
import { AssignmentsComponent } from './course-page/assignments/assignments.component';
import { SubmissionsComponent } from './assignment-page/submissions/submissions.component';
import { FilesizePipe } from './filesize.pipe';
import { AddMemberDialogComponent } from './course-page/members/add-member-dialog/add-member-dialog.component';
import { BatchAddMemberDialogComponent } from './course-page/members/batch-add-member-dialog/batch-add-member-dialog.component';
import { AssignmentsManagementComponent } from './course-page/assignments-management/assignments-management.component';
import { DatetimePickerComponent } from './common/datetime-picker/datetime-picker.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AssignmentPageComponent } from './assignment-page/assignment-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RemoveMemberDialogComponent } from './course-page/members/remove-member-dialog/remove-member-dialog.component';
import { RoleSelectComponent } from './course-page/members/role-select/role-select.component';
import { PasswordResetComponent } from './login-page/password-reset/password-reset.component';
import { AssignmentEditDialogComponent } from './course-page/assignment-edit-dialog/assignment-edit-dialog.component';
import { CourseEditDialogComponent } from './course-page/course-edit-dialog/course-edit-dialog.component';
import { SignUpComponent } from './login-page/register/sign-up.component';
import { HcaptchaModule } from './common/hcaptcha/hcaptcha.module';
import { PaginatorIntl } from './service/paginator-intl.service';
import { AssignmentsTableComponent } from './course-page/assignments/assignments-table/assignments-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AssignmentPageComponent,
    DashboardPageComponent,
    CoursePageComponent,
    SubmissionPageComponent,
    UploadDialogComponent,
    FilesTableComponent,
    LeaderboardComponent,
    NotFoundPageComponent,
    ReportComponent,
    FilesComponent,
    CourseCreateDialogComponent,
    JoinDialogComponent,
    AssignmentCreateDialogComponent,
    MembersComponent,
    AssignmentsComponent,
    SubmissionsComponent,
    FilesizePipe,
    AddMemberDialogComponent,
    BatchAddMemberDialogComponent,
    AssignmentsManagementComponent,
    DatetimePickerComponent,
    RemoveMemberDialogComponent,
    RoleSelectComponent,
    PasswordResetComponent,
    AssignmentEditDialogComponent,
    CourseEditDialogComponent,
    SignUpComponent,
    AssignmentsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighlightModule,
    HighlightPlusModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatSortModule,
    MatTreeModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatLuxonDateModule,
    NgxExtendedPdfViewerModule,
    HcaptchaModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'standard' } },
    { provide: MatPaginatorIntl, useClass: PaginatorIntl },
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
