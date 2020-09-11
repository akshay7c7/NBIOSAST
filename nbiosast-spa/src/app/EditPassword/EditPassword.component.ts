import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-EditPassword',
  templateUrl: './EditPassword.component.html',
  styleUrls: ['../app.component.css']
})
export class EditPasswordComponent implements OnInit {

  constructor(private http : HttpClient, 
              private authService : AuthService,
              private snackbar : MatSnackBar,
              private userService : UserService) { }

  password:string;
  cpassword:string;

  public user ={} as User;
  
  ngOnInit() {
  }


  EditPassword()
  {
    this.user.password = this.password;
    this.authService.EditPassword(this.authService.decodedToken.nameid,this.user)
    .subscribe(
      (next)=>{
        this.snackbar.open("Password Updated Successfully",'',{duration: 1000});
      },
      error=>{
        this.snackbar.open(error.message,'',{duration :1000})
        
      }
      
    )
  }

}
