import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {UserTokenPayload} from "../api/proto/api_pb";
import jwtDecode from "jwt-decode";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: string = '';
  user$: BehaviorSubject<UserTokenPayload | null> = new BehaviorSubject<UserTokenPayload | null>(null);
  LOCAL_STORAGE_KEY = "autograderToken";

  decodeToken() {
    if (this.token === "") {
    this.user$.next(null);
      return;

    }
      try {
      const payload = jwtDecode(this.token) as {"payload": string};
      const a = payload["payload"];
      const b = Uint8Array.from(atob(a), c => c.charCodeAt(0));
      this.user$.next(UserTokenPayload.deserializeBinary(b));
    } catch (e) {
      console.error(e);
    }
  }

  constructor() {
    this.token = localStorage.getItem(this.LOCAL_STORAGE_KEY) || "";
    this.decodeToken();
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, token);
    this.token = token;
    this.decodeToken();
  }
}
