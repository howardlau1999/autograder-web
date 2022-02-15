import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { match } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loggingIn: boolean = false;

  errorMessage: string | null = null;

  githubLoginURL = this.userService.githubLoginURL;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  userSubscription: Subscription;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userSubscription = this.userService.user$.subscribe(({ username }) => {
      if (username === null) return;
      this.notificationService.showSnackBar(`欢迎回来，${username}`);
      this.router.navigate(['/', 'courses']).then();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { username, password } = this.loginForm.value;
    this.loggingIn = true;
    this.errorMessage = null;
    this.loginForm.get('password')?.setErrors(null);
    this.userService.login(username, password).subscribe((result) => {
      this.loggingIn = false;
      pipe(
        result,
        match(
          () => {
            this.loginForm.get('password')?.setErrors({ password: true });
          },
          () => {},
        ),
      );
    });
  }
}
