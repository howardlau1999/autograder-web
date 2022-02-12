import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Either, left, right } from 'fp-ts/Either';
import { map } from 'rxjs/operators';
import { ApiService, RPCError } from '../api/api.service';
import { TokenService } from './token.service';
import { LoginResponse } from '../api/proto/api_pb';

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

  login(username: string, password: string): Observable<Either<LoginError, LoginResponse>> {
    return this.apiService.login(username, password).pipe(
      map((resp) => right(resp)),
      catchError((err: RPCError) => {
        return of(left({ password: err.message === 'WRONG_PASSWORD' }));
      }),
    );
  }
}
