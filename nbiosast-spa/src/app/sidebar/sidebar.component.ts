import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../app.component.css']
})
export class SidebarComponent implements OnInit {

  hide : boolean =true;
  constructor(private authService : AuthService) { }

  ngOnInit() {

    this.authService.loggingIn$
    .subscribe(
      data => {this.hide = data;}
    )
  }

}
