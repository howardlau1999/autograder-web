import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Either, left, right } from 'fp-ts/Either';
import { map } from 'rxjs/operators';
import { ApiService, RPCError } from '../api/api.service';
import { TokenService } from './token.service';
import {
  LoginResponse,
  RequestSignUpTokenResponse,
  ResetPasswordResponse,
  SignUpResponse,
} from '../api/proto/api_pb';
import { ErrorService, FormError } from './error.service';

export interface User {
  username: string | null;
  userId: number | null;
}

export interface LoginError {
  password: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({ userId: null, username: null });

  user: User = { userId: null, username: null };

  get userId() {
    return this.user.userId;
  }

  get username() {
    return this.user.username;
  }

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private errorService: ErrorService,
  ) {
    this.tokenService.user$.subscribe((user) => {
      if (user !== null) {
        this.updateUser(user.getUserId(), user.getUsername());
        return;
      }
      this.updateUser(null, null);
    });
  }

  isLoggedIn() {
    return this.user.userId !== null;
  }

  updateUser(userId: number | null, username: string | null) {
    this.user.userId = userId;
    this.user.username = username;
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
}
