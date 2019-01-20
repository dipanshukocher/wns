import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { StorageService } from './shared-services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private storage: StorageService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.storage.setCurrentPage(event.url);
      }
    });

    const isUser = this.storage.getUserData();
    const currentPage = this.storage.getCurrentPage();
    // window.addEventListener('focus', function () {
    //   const curentPageUrl: string = currentPage;
    //   // console.log("curentPageUrl->", curentPageUrl);
    //   if (curentPageUrl === '/login') {
    //     if (isUser) {
    //       router.navigate(['/dashboard']);
    //     }
    //   } else {
    //     if (!isUser) {
    //       router.navigate(['/login']);
    //     }
    //   }
    // });
  }

  ngOnInit() {
  }
}
