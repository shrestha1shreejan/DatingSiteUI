import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwthelper = new JwtHelperService();
  decodedtoken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;

          // setting token in local storage
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedtoken = this.jwthelper.decodeToken(user.token);
            console.log(this.decodedtoken);
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  // const decodedToken = helper.decodeToken(myRawToken);
  // const expirationDate = helper.getTokenExpirationDate(myRawToken);
  // const isExpired = helper.isTokenExpired(myRawToken);

  loggedIn() {
    const token = localStorage.getItem('token');
    // !! shortcut for if statement, if token has value return true else return false
    const result = this.jwthelper.isTokenExpired(token);
    return !result;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
