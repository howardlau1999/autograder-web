import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './service/token.service';
import { NotificationService } from './service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Autograder';

  loggedIn = false;

  username?: string;

  constructor(
    private tokenService: TokenService,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    this.tokenService.user$.subscribe((user) => {
      this.loggedIn = user !== null;
      this.username = user?.getUsername();
    });
  }

  logout() {
    this.tokenService.logout();
    this.notificationService.showSnackBar('您已退出登录');
    this.router.navigate(['/']).then();
  }
}
