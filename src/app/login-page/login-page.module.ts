import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { SignUpComponent } from './register/sign-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { GithubLoginComponent } from './github-login/github-login.component';
import { GithubBindComponent } from '../account-page/github-bind/github-bind.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    SignUpComponent,
    PasswordResetComponent,
    GithubLoginComponent,
    GithubBindComponent,
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    NgHcaptchaModule.forRoot(),
    MatButtonModule,
    MatIconModule,
  ],
})
export class LoginPageModule {}
