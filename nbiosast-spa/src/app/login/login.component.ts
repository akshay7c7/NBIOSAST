import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {

  model : any = {};

  constructor(private authService : AuthService , private router : Router) { }

  ngOnInit() {
  }

  login()
  {
    // this.authService.login(this.model)
    // .subscribe(
    //   next => {this.authService.HideSidebarTopBar(false)},
    //   ()=> this.router.navigate(['/dashboard']));

      this.authService.HideSidebarTopBar(false);

  }

}
