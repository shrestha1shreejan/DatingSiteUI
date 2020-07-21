import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
    this.authService.login(this.model).subscribe(
      next => {
        console.log('Logged in suceefully');
      }, error => {
        console.log(error);
      }
    );
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
  }

}
