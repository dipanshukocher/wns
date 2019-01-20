import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../login/login.service';
import { DashabordConfig } from './dashboard.config';
import { ApiService } from './../shared-services/api.service';
import { map, catchError } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  opened = true;
  submenu: any = [];
  showSubmenu = false;
  mainMenu: any;
  activeParent: string;
  activeComp: string;
  events: string[] = [];
  email = '';
  data: Object = <any>{};
  constructor(private router: Router, private loginService: LoginService, private snackBar: MatSnackBar, private dashboardService: DashboardService) {
    this.data = this.loginService.userData();
    this.email = this.data['userData'].email;
    // console.log(this.data);
    if (this.data) {
      this.snackBar.open(`WELCOME ${this.data['userData'].email.toUpperCase()}`, 'OK', {
        duration: 5000,
      });
    }
    router.events.subscribe((val: NavigationEnd) => {
      if (val.urlAfterRedirects) {
        this.activeParent = val.urlAfterRedirects.split('/')[2];
        this.activeComp = val.urlAfterRedirects.split('/')[3];
        if (this.activeParent) {
          this.mainMenu = new DashabordConfig().getAllConfig();
          // console.log(this.mainMenu);
        }
      }
    });
  }

  openSideNav(data) {
    // console.log(data);
  }

  closeSideNav(data) {
    // console.log(data);
  }

  ngOnInit() {
  }

  userLogout() {
    this.loginService.postLogOut().subscribe((success: any) => {
      this.snackBar.open( success.code === 200 ? 'LOGGED OUT SUCCESSFULLY' : 'LOGGING OUT', 'OK', {
        duration: 3000,
      });
    });
  }
}
