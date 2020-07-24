import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /// Gets all the users 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseurl + 'user');
  }

  /// Gets the user by Id
  getUser(userid: string): Observable<User> {
    return this.http.get<User>(this.baseurl + 'user/' + userid);
  }

  // update user
  updateUser(userid: string, user: User) {
    return this.http.put(this.baseurl + 'user/' + userid, user);
  }

}
