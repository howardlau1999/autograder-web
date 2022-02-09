import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {BehaviorSubject, tap} from "rxjs";
import {TokenService} from "./token.service";

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

  constructor(private apiService: ApiService, private tokenService: TokenService) {
    this.tokenService.user$.subscribe(user => {
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

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(tap(resp => {
      this.updateUser(resp.getUserId(), username);
    }));
  }
}
