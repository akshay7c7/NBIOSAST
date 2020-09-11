import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-EditProfile',
  templateUrl: './EditProfile.component.html',
  styleUrls: ['../app.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private fb : FormBuilder, 
    private authService : AuthService,
    private snackbar : MatSnackBar,
    private router : Router) { }
  ngOnInit() {

    this.EditUserDetails();
  }

  EditUserDetails()
  {
    
  }

}
