import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AuthGuard } from './../shared-services/auth.guard';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Login } from './login';
import { reject } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  is_signup = false;
  signup: Object = {};

  loginError = false;
  loginCredentialsError = false;
  loginCredentialsErrorMessage: any;
  loading = false;
  submitted = false;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 100;

  returnUrl: string;
  error = '';
  loginModel: Login = <Login>{};
  constructor(private router: Router, private loginService: LoginService, public snackBar: MatSnackBar) {
    this.loginModel = new Login();
  }

  ngOnInit() {}

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    this.loginService.login(this.loginModel)
    .then((success: any) => {
      this.loginError = false;
      this.loading = false;
    }, (error) => {
      if (error.status === 401 || error.status === 417) {
        this.snackBar.open((error.error.message).toUpperCase(), 'OK', {
          duration: 10000,
        });
        this.loading = false;
      } else if (error.status === 403) {
        this.snackBar.open('ACCESS FORBIDDEN', 'OK', {
          duration: 3000,
        });
        this.loading = false;
      }
    });
  }

  toggleLoginSignUp() {
    this.is_signup = !this.is_signup;
  }

  createUser() {
    console.log(this.signup);
    this.loginService.signup(this.signup).then(res => {
      console.log(res);
      if (res['status'] === 201) {
        this.snackBar.open('SIGNUP SUCCESSFULL, PLEASE LOGIN', 'OK', {
          duration: 3000,
        });
      }
    });
  }

}
