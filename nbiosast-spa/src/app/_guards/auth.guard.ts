import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
constructor(
  private authService: AuthService,
  private alertify : AlertifyService, 
  private router: Router
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
          this.alertify.error('You are not authorized to access this area');
        }
      }

      if(this.authService.loggedIn())
      {
        return true;
      }
      this.alertify.error("Not Authenticated");
      this.router.navigate(['/login']);
      return false;
  }
}
