import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-AddBranchAdmin',
  templateUrl: './AddBranchAdmin.component.html',
  styleUrls: ['../app.component.css']
})
export class AddBranchAdminComponent implements OnInit {

  @Output() cancelBranchCreation = new EventEmitter();
  

  constructor(private fb : FormBuilder, 
    private authService : AuthService,
    private alertify : AlertifyService) { }

ngOnInit() {

  this.CreateAddBranchAdmin();
}

createBranchAdminForm : FormGroup; //defining the form
user : User;

CreateAddBranchAdmin()
{
  this.createBranchAdminForm = this.fb.group(
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
    this.user = Object.assign({},this.createBranchAdminForm.value)
    this.authService.registerBranchAdmin(this.user)
    .subscribe(
    ()=>{this.alertify.success("Branch Admin registered successfully.")},
    error =>{this.alertify.error(error)}
    )
    } 
    else
    {
    console.log("Not valid");
    }

}
}
