import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AssignmentPageComponent } from './assignment-page/assignment-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { SubmissionPageComponent } from './submission-page/submission-page.component';
import { ReportComponent } from './submission-page/report/report.component';
import { LeaderboardComponent } from './assignment-page/leaderboard/leaderboard.component';
import { FilesComponent } from './submission-page/files/files.component';
import { AssignmentsComponent } from './course-page/assignments/assignments.component';
import { MembersComponent } from './course-page/members/members.component';
import { SubmissionsComponent } from './assignment-page/submissions/submissions.component';
import { PasswordResetComponent } from './login-page/password-reset/password-reset.component';
import { SignUpComponent } from './login-page/register/sign-up.component';
import { LoginGuard } from './login.guard';
import { GithubLoginComponent } from './login-page/github-login/github-login.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { GithubBindComponent } from './account-page/github-bind/github-bind.component';
import { VcdViewerPageComponent } from './vcd-viewer-page/vcd-viewer-page.component';
import { InspectionComponent } from './assignment-page/inspection/inspection.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { GradersComponent } from './admin-page/graders/graders.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'github', component: GithubLoginComponent },
  { path: 'github/bind', component: GithubBindComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'vcd', component: VcdViewerPageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      { path: 'graders', component: GradersComponent },
      { path: '', redirectTo: 'graders', pathMatch: 'full' },
    ],
  },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'courses',
    component: DashboardPageComponent,
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
  },
  {
    path: 'courses/:courseId',
    component: CoursePageComponent,
    children: [
      {
        path: 'assignments',
        component: AssignmentsComponent,
      },
      {
        path: 'members',
        component: MembersComponent,
      },
      {
        path: '',
        redirectTo: 'assignments',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'courses/:courseId/assignments/:assignmentId',
    component: AssignmentPageComponent,
    children: [
      {
        path: 'submissions',
        component: SubmissionsComponent,
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
      },
      {
        path: 'inspection',
        component: InspectionComponent,
      },
      {
        path: 'inspection/:userId',
        component: InspectionComponent,
      },
      {
        path: '',
        redirectTo: 'submissions',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'courses/:courseId/assignments/:assignmentId/submissions/:submissionId',
    component: SubmissionPageComponent,
    children: [
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
      },
      {
        path: 'files',
        component: FilesComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'report',
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
