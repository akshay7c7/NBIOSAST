import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-AddAccountAdmin',
  templateUrl: './AddAccountAdmin.component.html',
  styleUrls: ['../app.component.css']
})
export class AddAccountAdminComponent implements OnInit {

  constructor(private fb : FormBuilder, 
              private authService : AuthService,
              private snackbar : MatSnackBar,
              private router : Router) { }
  
  ngOnInit() {

    this.CreateAddAccountAdmin();
  }

  createAccountAdminForm : FormGroup; //defining the form
  user : User;

  CreateAddAccountAdmin()
  {
    this.createAccountAdminForm = this.fb.group(
      {
        name : ['',Validators.required],
        username : ['',Validators.required],
        email : ['',Validators.required],
        phoneNumber :['',Validators.required],
        city : ['',Validators.required],
        password : ['', [Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
        cpassword : ['',Validators.required]
      },
      {
        validator : this.passwordMatchValidator
      }

    )
  }
  passwordMatchValidator(g : FormGroup)
  {
    return g.get('password').value === g.get('cpassword').value ? null : {'mismatch':true};
  }

  RegisterAccountAdmin()
  {
    if(this.createAccountAdminForm.valid)
    {
        this.user = Object.assign({},this.createAccountAdminForm.value)
        this.authService.registerAccountAdmin(this.user)
        .subscribe(
          ()=>{this.snackbar.open('Account Admin Created Successfully','',{duration : 1000});
                this.createAccountAdminForm.reset();},
          error =>{this.snackbar.open(error.error,'',{duration : 1000})}
        )
    }

  }

  Cancel()
  {
    this.createAccountAdminForm.reset();
    this.router.navigate(['/dashboard']);
  }






}
