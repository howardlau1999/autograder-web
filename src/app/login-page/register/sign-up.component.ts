import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { ApiService } from '../../api/api.service';
import { UserService } from '../../service/user.service';
import { environment } from '../../../environments/environment';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  requestingCode: boolean = false;

  requestCodeCounter: number = 0;

  registering: boolean = false;

  counterSub: Subscription | undefined;

  signUpForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{3,}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{6}/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.signUpForm.invalid) return;
    const { username, email, code, password } = this.signUpForm.value;
    this.registering = true;
    this.userService.signUp(username, email, code, password).subscribe((result) => {
      this.registering = false;
      pipe(
        result,
        match(this.errorService.handleFormError(this.signUpForm), () => {
          this.snackBar.open('注册成功', '', { duration: 3000 });
          this.router.navigate(['/']).then();
        }),
      );
    });
  }

  onVerify(token: string) {
    if (this.signUpForm.get('username')?.invalid || this.signUpForm.get('email')?.invalid) return;
    this.requestingCode = true;
    const { email, username } = this.signUpForm.value;
    this.userService.requestSignUpToken(username, email, token).subscribe((result) => {
      this.requestingCode = false;
      pipe(
        result,
        match(this.errorService.handleFormError(this.signUpForm), () => {
          this.snackBar.open('验证码已发送', '关闭', { duration: 3000 });
          this.requestCodeCounter = 60;
          this.counterSub = timer(1000, 1000).subscribe((_) => {
            this.requestCodeCounter -= 1;
            if (this.requestCodeCounter === 0) {
              this.counterSub?.unsubscribe();
              this.counterSub = undefined;
            }
          });
        }),
      );
    });
  }

  onExpired(response: any) {
    if (!environment.production) {
      console.log(response);
    }
    this.snackBar.open(`图形验证码已过期，请重试`, '关闭', { duration: 3000 });
  }

  onError(error: any) {
    this.snackBar.open(`请求图形验证码出错 ${error}`, '关闭');
  }
}
