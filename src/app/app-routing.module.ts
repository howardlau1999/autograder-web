import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AssignmentPageComponent} from './assignment-page/assignment-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {CoursePageComponent} from "./course-page/course-page.component";
import {SubmissionPageComponent} from "./submission-page/submission-page.component";
import {ReportComponent} from "./submission-page/report/report.component";
import {LeaderboardComponent} from "./assignment-page/leaderboard/leaderboard.component";
import {FilesComponent} from "./submission-page/files/files.component";
import {AssignmentsComponent} from "./course-page/assignments/assignments.component";
import {MembersComponent} from "./course-page/members/members.component";
import {SubmissionsComponent} from "./assignment-page/submissions/submissions.component";
import {AssignmentsManagementComponent} from "./course-page/assignments-management/assignments-management.component";

const routes: Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'courses', component: DashboardPageComponent},
    {
      path: 'courses/:courseId', component: CoursePageComponent, children: [
        {
          path: 'assignments', component: AssignmentsComponent,
        },
        {
          path: 'members', component: MembersComponent,
        },
        {
          path: 'assignments/admin', component: AssignmentsManagementComponent,
        },
        {
          path: '', redirectTo: 'assignments', pathMatch: 'full',
        },
      ]
    },
    {
      path: 'courses/:courseId/assignments/:assignmentId', component: AssignmentPageComponent, children: [
        {
          path: 'submissions', component: SubmissionsComponent
        },
        {
          path: 'leaderboard', component: LeaderboardComponent
        },
        {
          path: '', redirectTo: 'submissions', pathMatch: 'full'
        },
      ]
    },
    {
      path: 'courses/:courseId/assignments/:assignmentId/submissions/:submissionId',
      component: SubmissionPageComponent,
      children: [
        {
          path: 'report', component: ReportComponent,
        },
        {
          path: 'leaderboard', component: LeaderboardComponent,
        },
        {
          path: 'files', component: FilesComponent,
        },
        {
          path: '', pathMatch: 'full', redirectTo: 'report',
        }
      ]
    },
  ]
;

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
