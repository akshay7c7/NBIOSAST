import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['../app.component.css']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('editForm',{static:true}) editForm:NgForm ;
  
  constructor(private fb : FormBuilder, 
    private authService : AuthService,
    private userService : UserService,
    private snackbar : MatSnackBar,
    private router : Router) { }

    public user ={} as User;

    ngOnInit() {
    this.userService.GetUserDetail(this.authService.decodedToken.nameid)
    .subscribe(
      data=>
      {
        this.user = data;
      }
    )
  }

  EditUserDetails()
  {
    this.userService.EditUserDetails(this.authService.decodedToken.nameid,this.user).
    subscribe(
      next=>{
        this.snackbar.open('Profile updated successfully','',{duration : 1000});
        this.editForm.reset(this.user);
          },

    error=>{
        this.snackbar.open(error.error,'',{duration: 1000});
          }
    )
  }

}
