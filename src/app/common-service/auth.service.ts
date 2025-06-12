import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    let accessToken = sessionStorage.getItem('access_token');
    return accessToken != undefined && accessToken != null;
  }


} 
