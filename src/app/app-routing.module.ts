import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {AssignmentPageComponent} from './assignment-page/assignment-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {CoursePageComponent} from "./course-page/course-page.component";
import {SubmissionPageComponent} from "./submission-page/submission-page.component";
import {ReportComponent} from "./submission-page/report/report.component";
import {LeaderboardComponent} from "./submission-page/leaderboard/leaderboard.component";
import {FilesComponent} from "./submission-page/files/files.component";

const routes: Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'courses', component: DashboardPageComponent},
    {path: 'courses/:courseId', component: CoursePageComponent},
    {path: 'courses/:courseId/assignments/:assignmentId', component: AssignmentPageComponent},
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
