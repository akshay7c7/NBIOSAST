import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {

  show : any;
  model : any = {};

  constructor(private authService : AuthService , private router : Router) { }

  ngOnInit() {

  }

  login()
  {
    this.model.username = "akshay7c7";
    this.model.password = "password"
    this.authService.login(this.model)
    .subscribe(
      next => {
        this.loggedIn();
        this.router.navigate(['/dashboard']);
        },
      ()=> this.router.navigate(['/dashboard']));
  }

  loggedIn()
  {
    this.show = this.authService.loggedIn();
    return this.show;

  }
}
