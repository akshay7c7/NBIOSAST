import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { Driver } from '../_models/Driver';
import { DriverService } from '../_services/driver.service';

@Injectable()
export class DriverDetailsResolver implements Resolve<Driver>
{
    constructor(private userService: UserService,
        private driverService : DriverService,
        private snackbar : MatSnackBar,
        private router : Router) {}


        resolve(route : ActivatedRouteSnapshot):Observable<Driver>
        {
            return this.driverService.getDrivers()
            .pipe(catchError(
                error=>{
                    this.snackbar.open(error.error,'',{duration :1000});
                    this.router.navigate(['/dashboard']);
                    return of(null);
                }
            )
            )
        }
}