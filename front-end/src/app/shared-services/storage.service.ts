import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setUserData(payload) {
    localStorage.setItem('currentUser', JSON.stringify(payload));
    if (payload) {
      const accessToken = `${payload['token']}`;
      localStorage.setItem('Authorization', `Bearer ${accessToken}`);
    }
  }

  getUserData() {
    return localStorage.getItem('currentUser');
  }

  clearUser() {
    localStorage.clear();
  }

  setCurrentPage(pageUrl) {
    localStorage.setItem('curentPageUrl', JSON.stringify(pageUrl));
  }

  getCurrentPage() {
    return localStorage.getItem('curentPageUrl');
  }

  getToken() {
    return localStorage.getItem('Authorization');
  }
}
