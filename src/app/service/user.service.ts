import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: number | null = null;
  constructor(private apiService: ApiService) { }

  isLoggedIn() {
    return this.userId !== null;
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(tap(resp => {
      this.userId = resp.getUserId();
    }));
  }
}
