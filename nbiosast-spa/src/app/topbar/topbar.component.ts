import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import * as $ from "jquery";
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  
  show : any ;
  constructor(public authService : AuthService, private router : Router) { }

  ngOnInit()
  {
    
  }


  loggedIn()
  {
    this.show = this.authService.loggedIn();
    return(this.show);
  }

  logout()
  {
    if(this.authService.logout())
    {
      this.router.navigate(['/login']);
    }
  }

  



}
