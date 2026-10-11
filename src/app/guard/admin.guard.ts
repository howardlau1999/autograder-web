import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  gotoDashboard() {
    this.router.navigate(['/', 'dashboard']).then();
  }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isAdmin) {
      this.gotoDashboard();
      return false;
    }
    return true;
  }

  canActivateChild(
    _childRoute: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.isAdmin) {
      this.gotoDashboard();
      return false;
    }
    return true;
  }
}
