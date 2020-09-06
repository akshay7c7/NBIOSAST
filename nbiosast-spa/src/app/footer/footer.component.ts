import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../app.component.css']
})
export class FooterComponent implements OnInit {

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
