import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
constructor(
  private authService: AuthService, 
  private router: Router,
  private snackbar : MatSnackBar
  )
  {
   
  }

  currentRoute: string;

  canActivate(
    next: ActivatedRouteSnapshot): boolean 
    {
      const roles = next.firstChild.data['roles'] as Array<string>;
      if (roles) {
      const match = this.authService.roleMatch(roles);
        if (match) {
          return true;
        } else {
          this.router.navigate(['/dashboard']);
          this.snackbar.open('You are not authorized to access this area','',{duration: 1000});
        }
      }

      if(this.authService.loggedIn())
      {
        return true;
      }
      this.snackbar.open('Not Authenticated','',{duration: 1000});
      this.router.navigate(['/login']);
      return false;
  }
}
