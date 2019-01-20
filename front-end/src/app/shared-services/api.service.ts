import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { EnvironmentService } from './environment.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: HttpClient, private environmentService: EnvironmentService, private router: Router, private snackBar: MatSnackBar, private storage: StorageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  get(url: string, service_host): Observable<any> {

    const absUrl = this.environmentService.getConfig()[service_host] + url;
    return this._http.get(absUrl).pipe(
      map(res => {
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }
  post(url: string, data: any, service_host): Observable<any> {
    const absUrl = this.environmentService.getConfig()[service_host] + url;
    return this._http.post(absUrl, data).pipe(
      map(res => {
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  postFileUpload(url: string, data: any, service_host): Observable<any>  {
    const headers =  new HttpHeaders({'Content-Type': 'multipart/form-data'});
    const absUrl = this.environmentService.getConfig()[service_host] + url;
    return this._http.post(absUrl, data, { headers, responseType: 'arraybuffer' }).pipe(
      map(res => {
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  put(url: string, data: any, service_host): Observable<any> {
    const absUrl = this.environmentService.getConfig()[service_host] + url;
    return this._http.put(absUrl, data).pipe(
      map(res => {
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  delete(url: string, service_host): Observable<any> {
    const absUrl = this.environmentService.getConfig()[service_host] + url;
    return this._http.delete(absUrl).pipe(
      map(res => {
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  getFileDownload(url: string, fileName: string, service_host): Observable<any> {
    const headers =  new HttpHeaders({'Content-Type': 'application/json' });
    const absUrl = this.environmentService.getConfig()[service_host] + url;
    return this._http.get(absUrl, { headers, responseType: 'arraybuffer'}).pipe(
      tap(res => {
        const blob = new Blob([res], { type: 'text/plain;charset=utf-8;' });
        const downloadLink = document.createElement('a');
        downloadLink.appendChild(document.createTextNode('Link'));
        downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
        downloadLink.setAttribute('download', fileName);
        downloadLink.click();
        this.showDownloadSnackBar(fileName);
        return res;
      }), catchError( error => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  postFileDownload(url: string, data: any, fileName: string, service_host): Observable<any> {
    const headers =  new HttpHeaders({});
    const absUrl = this.environmentService.getConfig()[service_host] + url;
    return this._http.post(absUrl, data, { headers, responseType: 'arraybuffer'}).pipe(
      tap(res => {
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const downloadLink = document.createElement('a');
        downloadLink.appendChild(document.createTextNode('Link'));
        downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
        downloadLink.setAttribute('download', fileName);
        downloadLink.click();
        this.showDownloadSnackBar(fileName);
        return res;
      }), catchError(error => {
        this.handleError(error);
        return throwError(error);
      }));
  }

  buildUrl() {

  }

  buildHeaders() {

  }

  handleError(error: HttpErrorResponse | any) {
    console.log(error);
    if (error.status === 401 || error.status === 417 || error.status === 0) {
      this.snackBar.open('USER UNAUTHORIZED, LOGGING OUT', 'OK', {
        duration: 10000,
      });
      this.storage.clearUser();
      this.router.navigate(['login']);
    } else if (error.status === 400) {
      this.snackBar.open('BAD REQUEST', 'OK', {
        duration: 3000,
      });
    } else if (error.status === 403) {
      this.snackBar.open('ACCESS FORBIDDEN', 'OK', {
        duration: 3000,
      });
    } else if (error.status === 404) {
      this.snackBar.open('UNABLE TO RETRIEVE, ERROR 404', 'OK', {
        duration: 3000,
      });
    }
    return error;
  }

  showDownloadSnackBar(fileName) {
    this.snackBar.open(`DOWNLOADED, ${fileName}`, 'OK', {
      duration: 10000,
    });
  }
}

