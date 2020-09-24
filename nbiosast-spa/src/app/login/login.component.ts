import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
               private snackbar : MatSnackBar) { }

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
        this.snackbar.open('Logged in successfully','',{duration : 1000}) ;}, 
      error => {
        if(error.statusText==="Unknown Error")
        {
          this.snackbar.open("Please check your internet connection",'',{duration:1000}) ;
        }
        
        else{
          this.snackbar.open(error.message,'',{duration:1000}) ;
        }
        
      },
        
      ()=> this.router.navigate(['/dashboard']));
  }

  loggedIn()
  {
    this.show = this.authService.loggedIn();
    return this.show;

  }
}
