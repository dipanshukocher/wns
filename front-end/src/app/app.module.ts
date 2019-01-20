import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { EnvironmentService } from './shared-services/environment.service';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { AuthInterceptor } from './shared-services/http-interceptors';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatRippleModule, MatProgressBarModule } from '@angular/material';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './shared-services/api.service';
import { StorageService } from './shared-services/storage.service';
import { LoginService } from './login/login.service';
import { NvD3Module } from 'ng2-nvd3';
// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NvD3Module,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatRippleModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [
    EnvironmentService,
    {
      provide: APP_INITIALIZER,
      useFactory: (svc: EnvironmentService) => () => svc.loadAppConfig(),
      multi: true,
      deps: [EnvironmentService]
    },
    httpInterceptorProviders,
    ApiService,
    LoginService,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
