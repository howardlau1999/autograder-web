import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PasswordResetComponent } from './login-page/password-reset/password-reset.component';
import { SignUpComponent } from './login-page/register/sign-up.component';
import { LoginGuard } from './login.guard';
import { GithubLoginComponent } from './login-page/github-login/github-login.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { GithubBindComponent } from './account-page/github-bind/github-bind.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: 'vcd',
    loadChildren: () =>
      import('./vcd-viewer-page/vcd-viewer-page.module').then((m) => m.VcdViewerPageModule),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    loadChildren: () => import('./admin-page/admin-page.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./dashboard-page/dashboard-page.module').then((m) => m.DashboardPageModule),
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
  },
  {
    path: 'courses/:courseId',
    loadChildren: () => import('./course-page/course-page.module').then((m) => m.CoursePageModule),
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
  },
  {
    path: 'courses/:courseId/assignments/:assignmentId',
    loadChildren: () =>
      import('./assignment-page/assignment-page.module').then((m) => m.AssignmentPageModule),
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
  },
  {
    path: 'courses/:courseId/assignments/:assignmentId/submissions/:submissionId',
    loadChildren: () =>
      import('./submission-page/submission-page.module').then((m) => m.SubmissionPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./login-page/login-page.module').then((m) => m.LoginPageModule),
  },
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
