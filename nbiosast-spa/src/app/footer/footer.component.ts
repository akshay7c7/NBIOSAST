import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../app.component.css']
})
export class FooterComponent implements OnInit {

  hide : boolean =true;
  constructor(private authService : AuthService) { }

  ngOnInit() {

    this.authService.loggingIn$
    .subscribe(
      data => {this.hide = data;}
    )
  }

}
