import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-EditPassword',
  templateUrl: './EditPassword.component.html',
  styleUrls: ['../app.component.css']
})
export class EditPasswordComponent implements OnInit {

  constructor(private http : HttpClient, private authService : AuthService) { }

  password:string;
  cpassword:string;
  ngOnInit() {
  }


  EditPassword()
  {
    
  }

}
