import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Either, left, right } from 'fp-ts/Either';
import { map } from 'rxjs/operators';
import { grpc } from '@improbable-eng/grpc-web';
import { toLowerCase } from 'fp-ts/string';
import { ApiService, RPCError } from '../api/api.service';
import { TokenService } from './token.service';
import {
  LoginResponse,
  RequestSignUpTokenResponse,
  ResetPasswordResponse,
  SignUpResponse,
} from '../api/proto/api_pb';
import { FormError, FormFieldError } from './error.service';

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

  constructor(private apiService: ApiService, private tokenService: TokenService) {
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

  handlerFormError(err: RPCError) {
    const { status, message } = err;
    const error: FormFieldError = status === grpc.Code.AlreadyExists ? 'duplicated' : 'invalid';
    const field = toLowerCase(message);
    return of(
      left({
        field,
        error,
        message,
      }),
    );
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
      catchError(this.handlerFormError),
    );
  }

  requestPasswordReset(
    email: string,
    captcha: string,
  ): Observable<Either<FormError, RequestSignUpTokenResponse>> {
    return this.apiService.requestPasswordReset(email, captcha).pipe(
      map((resp) => right(resp)),
      catchError(this.handlerFormError),
    );
  }

  resetPassword(
    email: string,
    code: string,
    password: string,
  ): Observable<Either<FormError, ResetPasswordResponse>> {
    return this.apiService.resetPassword(email, code, password).pipe(
      map((resp) => right(resp)),
      catchError(this.handlerFormError),
    );
  }

  requestSignUpToken(
    username: string,
    email: string,
    captcha: string,
  ): Observable<Either<FormError, RequestSignUpTokenResponse>> {
    return this.apiService.requestSignUpToken(username, email, captcha).pipe(
      map((resp) => right(resp)),
      catchError(this.handlerFormError),
    );
  }
}
