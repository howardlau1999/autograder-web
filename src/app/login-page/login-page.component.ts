import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { match } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { UserService } from '../service/user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loggingIn: boolean = false;

  errorMessage: string | null = null;

  githubLoginURL = this.userService.githubLoginURL;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {}

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
          () => {
            this.router.navigate(['courses']).then();
          },
        ),
      );
    });
  }
}
