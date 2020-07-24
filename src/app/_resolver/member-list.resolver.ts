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

export class MemberListResolverService implements Resolve<User[]> {

    constructor(private userService: UserService, private route: Router, private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
        return this.userService.getUsers().pipe(catchError(error => {
            this.alertify.error('Problem retrieving user data');
            this.route.navigate(['/home']);
            return of(null);
        }));
    }
}