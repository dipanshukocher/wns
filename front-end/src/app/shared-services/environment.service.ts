import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private appConfig: Environment;
  constructor(private http: HttpClient) { }
  loadAppConfig() {
    return this.http.get('/assets/environment.json')
      .toPromise()
      .then(data => {
        this.appConfig = data as Environment;
      });
  }
  getConfig(): Environment {
    return this.appConfig;
  }
}
