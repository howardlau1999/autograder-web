import { Component, OnInit, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { ApiService } from '../../api/api.service';
import { UserService } from '../../service/user.service';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class PasswordResetComponent implements OnInit {
  requestingCode: boolean = false;

  requestCodeCounter: number = 0;

  resetting: boolean = false;

  counterSub: Subscription | undefined;

  private codeRequestSub?: Subscription;

  siteKey = this.userService.hcaptchaSiteKey;

  resetForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    code: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private errorService: ErrorService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.resetForm.invalid) return;
    const { email, code, password } = this.resetForm.getRawValue();
    this.resetting = true;
    this.userService
      .resetPassword(email, code, password)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
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
    this.codeRequestSub?.unsubscribe();
    this.requestingCode = true;
    const { email } = this.resetForm.getRawValue();
    this.codeRequestSub = this.userService
      .requestPasswordReset(email, token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.requestingCode = false;
        pipe(
          result,
          match(this.errorService.handleFormError(this.resetForm), () => {
            this.snackBar.open('验证码已发送', '关闭', { duration: 3000 });
            this.counterSub?.unsubscribe();
            this.requestCodeCounter = 60;
            this.counterSub = timer(1000, 1000)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe(() => {
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

  onExpired(_response: any) {
    this.snackBar.open('图形验证码过期，请重试', '关闭', { duration: 3000 });
  }

  onError(error: any) {
    this.snackBar.open(`请求图形验证码出错 ${error}`, '关闭');
  }
}
