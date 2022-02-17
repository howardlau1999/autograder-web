import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { ApiService } from '../../api/api.service';
import { UserService } from '../../service/user.service';
import { ErrorService } from '../../service/error.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  requestingCode: boolean = false;

  requestCodeCounter: number = 0;

  resetting: boolean = false;

  counterSub: Subscription | undefined;

  siteKey = this.userService.hcaptchaSiteKey;

  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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
    if (this.resetForm.invalid) return;
    const { email, code, password } = this.resetForm.value;
    this.resetting = true;
    this.userService.resetPassword(email, code, password).subscribe((result) => {
      this.resetting = false;
      pipe(
        result,
        match(this.errorService.handleFormError(this.resetForm), () => {
          this.snackBar.open('密码重置成功', '关闭', { duration: 3000 });
          this.router.navigate(['/']).then();
        }),
      );
    });
  }

  onVerify(token: string) {
    this.requestingCode = true;
    this.userService.requestPasswordReset(this.resetForm.value.email, token).subscribe((result) => {
      this.requestingCode = false;
      pipe(
        result,
        match(this.errorService.handleFormError(this.resetForm), () => {
          this.snackBar.open('验证码已发送', '关闭', { duration: 3000 });
          this.requestCodeCounter = 60;
          this.counterSub = timer(1000, 1000).subscribe(() => {
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
    this.snackBar.open('图形验证码过期，请重试', '关闭', { duration: 3000 });
  }

  onError(error: any) {
    this.snackBar.open(`请求图形验证码出错 ${error}`, '关闭');
  }
}
