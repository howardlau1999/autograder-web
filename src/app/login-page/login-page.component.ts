import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {FormBuilder} from "@angular/forms";
import {first} from "rxjs";
import {map} from "rxjs/operators";
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
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const {username, password} = this.loginForm.value;
    this.loggingIn = true;
    this.errorMessage = null;
    this.loginForm.get("password")?.setErrors(null);
    this.userService.login(username as string, password as string).subscribe({
      next: resp => {
        this.router.navigate(["dashboard"]).then();
      },
      error: err => {
        this.errorMessage = err;
        this.loginForm.get("password")?.setErrors({"password": err})
        this.loggingIn = false;
      },
    });
  }
}
