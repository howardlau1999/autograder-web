import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../api/api.service';

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
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.signUpForm.invalid) return;
    const { username, email, code, password } = this.signUpForm.value;
    this.registering = true;
    this.apiService.signUp(username, email, code, password).subscribe({
      next: (resp) => {
        this.registering = false;
        this.snackBar.open('注册成功', '', { duration: 3000 });
        this.router.navigate(['/']).then();
      },
      error: (err) => {
        this.registering = false;
        if (err === 'INVALID_CODE') {
          this.signUpForm.get('code')?.setErrors({ invalid_code: true });
        }
      },
    });
  }

  onVerify(token: string) {
    if (this.signUpForm.get('username')?.invalid || this.signUpForm.get('email')?.invalid) return;
    this.requestingCode = true;
    const { email, username } = this.signUpForm.value;
    this.apiService.requestSignUpToken(username, email, token).subscribe({
      next: (resp) => {
        this.requestingCode = false;
        this.snackBar.open('验证码已发送', '', { duration: 3000 });
        this.requestCodeCounter = 60;
        this.counterSub = timer(1000, 1000).subscribe((_) => {
          --this.requestCodeCounter;
          if (this.requestCodeCounter === 0) {
            this.counterSub?.unsubscribe();
            this.counterSub = undefined;
          }
        });
      },
      error: (err) => {
        this.requestingCode = false;
        console.error(err);
      },
    });
  }

  onExpired(response: any) {
    console.log(response);
  }

  onError(error: any) {
    this.snackBar.open(`请求验证码出错：${error}`, '关闭');
  }
}
