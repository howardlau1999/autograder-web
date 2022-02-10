import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loggingIn: boolean = false;
  errorMessage: string | null = null;
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.loginForm.invalid) return;
    const {username, password} = this.loginForm.value;
    this.loggingIn = true;
    this.errorMessage = null;
    this.loginForm.get("password")?.setErrors(null);
    this.userService.login(username as string, password as string).subscribe({
      next: _ => {
        this.router.navigate(["courses"]).then();
      },
      error: err => {
        this.errorMessage = err;
        this.loginForm.get("password")?.setErrors({"password": err})
        this.loggingIn = false;
      },
    });
  }
}
