import { AuthService } from './../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from 'src/app/_models/User';
import { UserService } from '../_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MemberEditResolverService implements Resolve<User> {

    constructor(private userService: UserService, private route: Router, private alertify: AlertifyService,
                private authService: AuthService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedtoken.nameid).pipe(catchError(error => {
            this.alertify.error('Problem retrieving user data');
            this.route.navigate(['/members']);
            return of(null);
        }));
    }
}