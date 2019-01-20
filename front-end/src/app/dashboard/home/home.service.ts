import { Injectable } from '@angular/core';
import { ApiService } from '../../shared-services/api.service';
import { map, catchError } from 'rxjs/operators';
import { EnvironmentService } from 'src/app/shared-services/environment.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  dashboardPieChartReport = 'api/piechart';
  dashboardTableReport = 'api/table-data';
  dashboardBarChartData =  'api/barchart';
  constructor(private apiService: ApiService, private environmentService: EnvironmentService, private _http: HttpClient) { }

  fileUploadHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  submitFileData(data) {
    return this.post(`api/file-upload`, data, 'baseUrl').pipe(
      map(result => {
        return result;
      }, catchError(error => {
        console.log(error);
        return error;
      }))
    );
  }

  post(url: string, data: any, service_host): Observable<any> {
    const absUrl = this.environmentService.getConfig()[service_host] + url;
    return this._http.post(absUrl, data, {}).pipe(
      map(res => {
        return res;
      }), catchError(error => {
        return throwError(error);
      })
    );
  }

  getDashboardPieChartData() {
    return this.apiService.get(`${this.dashboardPieChartReport}`, 'baseUrl').pipe(
      map(result => {
        return result;
      }, catchError(error => {
        console.log(error);
        return error;
      }))
    );
  }

  getDashboardTableData() {
    return this.apiService.get(`${this.dashboardTableReport}`, 'baseUrl').pipe(
      map(result => {
        return result;
      }, catchError(error => {
        console.log(error);
        return error;
      }))
    );
  }

  getBarChartData() {
    return this.apiService.get(`${this.dashboardBarChartData}`, 'baseUrl').pipe(
      map(result => {
        return result;
      }, catchError(error => {
        console.log(error);
        return error;
      }))
    );
  }
}
