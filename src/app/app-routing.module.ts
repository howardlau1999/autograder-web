import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssignmentPageComponent} from './assignment-page/assignment-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'assignment', component: AssignmentPageComponent},
  {path: 'dashboard', component: DashboardPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
