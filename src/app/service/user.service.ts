import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {BehaviorSubject, tap} from "rxjs";

export interface User {
  username: string | null;
  userId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({userId: null, username: null});
  user: User = {userId: null, username: null};
  constructor(private apiService: ApiService) { }

  isLoggedIn() {
    return this.user.userId !== null;
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(tap(resp => {
      this.user.userId = resp.getUserId();
      this.user.username = username;
      this.user$.next(this.user);
    }));
  }
}
