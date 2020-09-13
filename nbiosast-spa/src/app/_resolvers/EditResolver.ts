import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class EditResolver implements Resolve<User>{

   
    constructor(private userService: UserService,
                 private authService : AuthService,
                 private snackbar : MatSnackBar,
                 private router : Router) {
      
        
    }

    resolve(route: ActivatedRouteSnapshot):Observable<User>{
            return this.userService.GetUserDetail(this.authService.decodedToken.nameid)
            .pipe(catchError(
                error=>{
                    this.snackbar.open(error.error,'',{duration :1000});
                    this.router.navigate(['/dashboard']);
                    return of(null);
                }
            )
            )}
}