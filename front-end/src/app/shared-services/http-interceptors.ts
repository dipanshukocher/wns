import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService, private environmentService: EnvironmentService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.storage.getToken();
    let authReq = req.clone();
    if (authToken) {
      const headers: any = <any>{
        'Authorization': authToken,
      };
      // console.log(req.headers.get('Content-Type'));
      const newHead =  req.headers.get('Content-Type');
      headers['Content-Type'] = newHead ? newHead : 'application/json';
      authReq = req.clone({
        // headers: req.headers.set('Authorization', authToken)
        headers: new HttpHeaders(headers)
      });
    }
    return next.handle(authReq);
  }
}
