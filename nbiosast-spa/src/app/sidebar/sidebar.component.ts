import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SideNavService } from '../SideNav.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../app.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer') public sidenav: MatDrawer;
  show : any;
  showWhilePrint : any
  constructor(private authService : AuthService, private sideNav : SideNavService) { }

  ngOnInit() {

    this.showWhilePrint = false;
  }

  ngAfterViewInit(): void {
    this.sideNav.setSidenav(this.sidenav);
  }

  loggedIn()
  {
    this.show = this.authService.loggedIn();
    return(this.show);
  }

}
