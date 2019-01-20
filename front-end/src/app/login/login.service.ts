import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared-services/api.service';
import { Login } from './login';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from '../shared-services/storage.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { EnvironmentService } from '../shared-services/environment.service';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  username: string;
  password: string;
  userDataFrmApi: any;
  constructor(private apiService: ApiService, public snackBar: MatSnackBar, private environmentService: EnvironmentService, private _http: HttpClient, private router: Router, private storage: StorageService) { }

  login(data: Login): Promise<any>|any  {
    return new Promise((success, reject) => {
      const absUrl = this.environmentService.getConfig()['baseUrl'];
      return this._http.post(`${absUrl}user/login`, data)
      .subscribe((response) => {
        if (response) {
          this.storage.setUserData(response);
          this.router.navigate(['/app']);
          success(response);
          } else {
            reject(response);
          }
        success(response);
      }, (error) => {
        reject(error);
      })
      , catchError((error: HttpErrorResponse) => {
          this.apiService.handleError(error);
          reject(error);
          return throwError(error);
        });
      });
  }

  signup(data): Promise<any>|any  {
    return new Promise((success, reject) => {
      const absUrl = this.environmentService.getConfig()['baseUrl'];
      return this._http.post(`${absUrl}user/signup`, data).subscribe((response) => {
        if (response) {
          success(response);
          } else {
            reject(response);
          }
        success(response);
      }, (error) => {
        reject(error);
      })
      , catchError((error: HttpErrorResponse) => {
          this.apiService.handleError(error);
          reject(error);
          return throwError(error);
        });
      });
  }

  userContext() {
  }

  userData() {
    return this.userDataFrmApi = JSON.parse(this.storage.getUserData());
  }

  postLogOut() {
    const absUrl = this.environmentService.getConfig()['baseUrl'];
    return this.apiService.post(`user/logout`, {}, 'baseUrl').pipe(
      map(result => {
        if (result.status === 200) {
          // remove local storage username and jwt token in local storage to logged out user
          this.storage.clearUser();
          this.router.navigate(['/login']);
        } else if (result.code === 401 || result.code === 403) {
          console.log('error 401');
          this.storage.clearUser();
        }
        return result;
    }));
  }
}
