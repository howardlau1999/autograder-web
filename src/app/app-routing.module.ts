import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssignmentPageComponent} from './assignment-page/assignment-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {CoursePageComponent} from "./course-page/course-page.component";
import {SubmissionPageComponent} from "./submission-page/submission-page.component";

const routes: Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'courses', component: DashboardPageComponent},
    {path: 'courses/:courseId', component: CoursePageComponent},
    {path: 'courses/:courseId/assignments/:assignmentId', component: AssignmentPageComponent},
    {path: 'courses/:courseId/assignments/:assignmentId/submissions/:submissionId', component: SubmissionPageComponent},
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
