import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, timer} from "rxjs";
import {ApiService} from "../../api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  requestingCode: boolean = false;
  requestCodeCounter: number = 0;
  resetting: boolean = false;
  counterSub: Subscription | undefined;
  resetForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    code: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.resetForm.invalid) return;
    const {email, code, password} = this.resetForm.value;
    this.resetting = true;
    this.apiService.resetPassword(email, code, password).subscribe(
      {
        next: resp => {
          this.resetting = false;
          this.snackBar.open("密码重置成功", "", {duration: 3000});
          this.router.navigate(['/']).then();
        }, error: err => {
          this.resetting = false;
          if (err === "INVALID_CODE") {
            this.resetForm.get('code')?.setErrors({'invalid_code': true});
          }
        }
      });
  }

  onRequestCodeClicked(e: MouseEvent) {
    e.preventDefault();
    this.requestingCode = true;
    this.apiService.requestPasswordReset(this.resetForm.value.email).subscribe(resp => {
      this.requestingCode = false;
      this.snackBar.open("验证码已发送", "", {duration: 3000});
      this.requestCodeCounter = 60;
      this.counterSub = timer(1000, 1000).subscribe(_ => {
        --this.requestCodeCounter;
        if (this.requestCodeCounter === 0) {
          this.counterSub?.unsubscribe();
          this.counterSub = undefined;
        }
      });
    });
  }
}