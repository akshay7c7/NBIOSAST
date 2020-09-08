import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {

  show : any;
  model : any = {};

  constructor(private authService : AuthService ,
               private router : Router,
               private alertify : AlertifyService) { }

  ngOnInit() {
      if(this.loggedIn())
      {
        this.router.navigate(['/dashboard']);
      }
  }

  login()
  {
    this.authService.login(this.model)
    .subscribe(
      next => {
        this.alertify.success('Logged in successfully');  }, 
  
      error => {
        this.alertify.error('Failed to login');  },
  
      ()=> this.router.navigate(['/dashboard']));
  }

  loggedIn()
  {
    this.show = this.authService.loggedIn();
    return this.show;

  }
}
