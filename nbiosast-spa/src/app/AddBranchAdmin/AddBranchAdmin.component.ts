import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-AddBranchAdmin',
  templateUrl: './AddBranchAdmin.component.html',
  styleUrls: ['../app.component.css']
})

export class AddBranchAdminComponent implements OnInit {

  @Output() cancelBranchCreation = new EventEmitter();
  

  constructor(private fb : FormBuilder, 
    private authService : AuthService,
    private snackbar : MatSnackBar) { }

ngOnInit() {

  this.CreateAddBranchAdmin();
}

  createBranchAdminForm : FormGroup; 
  user : User;

  CreateAddBranchAdmin()
  {
        this.createBranchAdminForm = this.fb.group
        (
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

  RegisterBranchAdmin()
  {
    if(this.createBranchAdminForm.valid)
      {
        this.user = Object.assign({},this.createBranchAdminForm.value);

        this.authService.registerBranchAdmin(this.user)
        .subscribe(
          ()=>{
            this.snackbar.open('Branch Admin Created Successfully','',{duration : 1000});
            this.createBranchAdminForm.reset();
              },
              
          error =>{this.snackbar.open(error.error,'',{duration : 1000});}
                  )
      } 

  }

  Cancel()
  {
    this.createBranchAdminForm.reset();
    this.cancelBranchCreation.emit(false);
  }

}
