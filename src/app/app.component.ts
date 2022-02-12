import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Autograder';

  loggedIn = false;

  constructor(private tokenService: TokenService, private router: Router) {
    this.tokenService.user$.subscribe((user) => {
      this.loggedIn = user !== null;
    });
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/']).then();
  }
}
