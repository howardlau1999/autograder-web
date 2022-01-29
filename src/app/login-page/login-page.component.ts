import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {FormBuilder} from "@angular/forms";
import {first} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  })

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const {username, password} = this.loginForm.value;
    this.apiService.login(username as string, password as string).pipe(first()).subscribe(resp => {
      console.log(resp.getUserId());
    });
  }
}
