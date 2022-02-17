import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserTokenPayload } from '../api/proto/api_pb';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  jwtHelper = new JwtHelperService();

  token: string = '';

  user$: BehaviorSubject<UserTokenPayload | null> = new BehaviorSubject<UserTokenPayload | null>(
    null,
  );

  LOCAL_STORAGE_KEY = 'autograderToken';

  constructor() {
    this.token = localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';
    this.decodeToken();
  }

  decodeToken() {
    if (this.token === '') {
      this.user$.next(null);
      return;
    }
    try {
      const isExpired = this.jwtHelper.isTokenExpired(this.token);
      if (isExpired) {
        this.user$.next(null);
        return;
      }
      const payload = this.jwtHelper.decodeToken(this.token) as { payload: string };
      const a = payload.payload;
      const b = Uint8Array.from(atob(a), (c) => c.charCodeAt(0));
      this.user$.next(UserTokenPayload.deserializeBinary(b));
    } catch (e) {
      this.user$.next(null);
    }
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string | null) {
    if (token === null) {
      localStorage.removeItem(this.LOCAL_STORAGE_KEY);
      this.token = '';
    } else {
      localStorage.setItem(this.LOCAL_STORAGE_KEY, token);
      this.token = token;
    }
    this.decodeToken();
  }

  logout() {
    this.setToken(null);
  }
}
