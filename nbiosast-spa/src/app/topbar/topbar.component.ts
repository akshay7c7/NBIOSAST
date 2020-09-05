import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  
  hide : boolean = true;
  constructor(private authService : AuthService) { }

  ngOnInit() {

    this.authService.loggingIn$
    .subscribe(
      data => {this.hide = data;}
    )
  }


  logout()
  {
    this.hide = !false;
  }



}
