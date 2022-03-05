import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { GithubLoginComponent } from './github-login/github-login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SignUpComponent } from './register/sign-up.component';
import { GithubBindComponent } from '../account-page/github-bind/github-bind.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'account',
    loadChildren: () =>
      import('../account-page/account-page.module').then((m) => m.AccountPageModule),
  },
  { path: 'github', component: GithubLoginComponent },
  { path: 'github/bind', component: GithubBindComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
