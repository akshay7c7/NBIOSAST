import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../app.component.css']
})
export class SidebarComponent implements OnInit {

  show : any;
  constructor(private authService : AuthService) { }

  ngOnInit() {

    
  }

  loggedIn()
  {
    this.show = this.authService.loggedIn();
    return(this.show);
  }

}
