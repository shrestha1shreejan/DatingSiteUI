import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { User } from 'src/app/_models/User';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  // to get access to the form component we use ViewChild
  @ViewChild('editForm', { static: true }) editForm: NgForm;

  // to prevent user from losing data for browser close click
  // this gives a browser specific popup to prevent close till you confirm
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
    });
  }

  updateUser() {
    // console.log(this.user);
    this.userService.updateUser(this.authService.decodedtoken.nameid, this.user).subscribe(next => {
      this.editForm.reset(this.user);
      this.alertify.success('User updated sucessfully');
    }, error => { 
      this.alertify.error(error);
    });

  }
}
