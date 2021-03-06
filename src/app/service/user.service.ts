import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Either, left, right } from 'fp-ts/Either';
import { map } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { TokenService } from './token.service';
import {
  LoginResponse,
  RequestSignUpTokenResponse,
  ResetPasswordResponse,
  SignUpResponse,
} from '../api/proto/api_pb';
import { ErrorService, FormError, RPCError } from './error.service';
import { environment } from '../../environments/environment';

export interface User {
  username: string | null;
  userId: number | null;
  isAdmin: boolean;
}

export interface LoginError {
  password: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({
    userId: null,
    username: null,
    isAdmin: false,
  });

  user: User = { userId: null, username: null, isAdmin: false };

  hcaptchaSiteKey: string;

  githubClientId: string;

  githubLoginURL: string;

  githubBindURL: string;

  get userId() {
    return this.user.userId;
  }

  get username() {
    return this.user.username;
  }

  get isAdmin() {
    return this.user.isAdmin;
  }

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private errorService: ErrorService,
  ) {
    this.hcaptchaSiteKey = environment.hcaptchaSiteKey;
    this.githubClientId = environment.githubClientId;

    const serverHcaptchaSiteKey = localStorage.getItem('server_hcaptcha_site_key');
    if (serverHcaptchaSiteKey !== null) {
      this.hcaptchaSiteKey = serverHcaptchaSiteKey;
    }
    const serverGithubClientId = localStorage.getItem('server_github_client_id');
    if (serverGithubClientId !== null) {
      this.githubClientId = serverGithubClientId;
    }

    this.githubLoginURL = `https://github.com/login/oauth/authorize?client_id=${
      this.githubClientId
    }&scope=${encodeURIComponent('read:user user:email')}`;

    this.githubBindURL = `${this.githubLoginURL}&redirect_uri=${encodeURIComponent(
      // eslint-disable-next-line no-restricted-globals
      `${location.protocol}//${location.host}/github/bind`,
    )}`;
    this.tokenService.user$.subscribe((user) => {
      if (user !== null) {
        this.updateUser(user.getUserId(), user.getUsername(), user.getIsAdmin());
        return;
      }
      this.updateUser(null, null);
    });
  }

  isLoggedIn() {
    return this.user.userId !== null;
  }

  updateUser(userId: number | null, username: string | null, isAdmin: boolean = false) {
    this.user.userId = userId;
    this.user.username = username;
    this.user.isAdmin = isAdmin;
    this.user$.next(this.user);
  }

  login(username: string, password: string): Observable<Either<LoginError, LoginResponse>> {
    return this.apiService.login(username, password).pipe(
      map((resp) => right(resp)),
      catchError((err: RPCError) => {
        return of(left({ password: err.message === 'WRONG_PASSWORD' }));
      }),
    );
  }

  signUp(
    username: string,
    email: string,
    code: string,
    password: string,
  ): Observable<Either<FormError, SignUpResponse>> {
    return this.apiService.signUp(username, email, code, password).pipe(
      map((resp) => right(resp)),
      catchError(this.errorService.getFormError),
    );
  }

  requestPasswordReset(
    email: string,
    captcha: string,
  ): Observable<Either<FormError, RequestSignUpTokenResponse>> {
    return this.apiService.requestPasswordReset(email, captcha).pipe(
      map((resp) => right(resp)),
      catchError(this.errorService.getFormError),
    );
  }

  resetPassword(
    email: string,
    code: string,
    password: string,
  ): Observable<Either<FormError, ResetPasswordResponse>> {
    return this.apiService.resetPassword(email, code, password).pipe(
      map((resp) => right(resp)),
      catchError(this.errorService.getFormError),
    );
  }

  requestSignUpToken(
    username: string,
    email: string,
    captcha: string,
  ): Observable<Either<FormError, RequestSignUpTokenResponse>> {
    return this.apiService.requestSignUpToken(username, email, captcha).pipe(
      map((resp) => right(resp)),
      catchError(this.errorService.getFormError),
    );
  }

  githubLogin(code: string) {
    return this.apiService.githubLogin(code);
  }

  bindGithub(code: string) {
    return this.apiService.bindGithub(code);
  }

  getUser() {
    return this.apiService.getUser().pipe(map((resp) => resp.getUser()));
  }

  unbindGithub() {
    return this.apiService.unbindGithub().pipe(map((resp) => resp.getSuccess()));
  }

  updateUserInfo(nickname: string, studentId: string) {
    return this.apiService.updateUser(nickname, studentId).pipe(map((resp) => resp.getSuccess()));
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return this.apiService
      .updatePassword(oldPassword, newPassword)
      .pipe(map((resp) => resp.getSuccess()));
  }
}
