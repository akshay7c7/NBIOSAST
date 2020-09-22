import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from 'src/assets/cities';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-AddBranchAdmin',
  templateUrl: './AddBranchAdmin.component.html',
  styleUrls: ['../app.component.css']
})

export class AddBranchAdminComponent implements OnInit {


  myControl = new FormControl();
  city = this.cityService.cities;
  cityNames=[];
  filteredOptions: Observable<string[]>;

  @Output() cancelBranchCreation = new EventEmitter();
  

  constructor(private fb : FormBuilder, 
    private authService : AuthService,
    private snackbar : MatSnackBar,
    private cityService: City ) { }

ngOnInit() {

  this.CreateAddBranchAdmin();
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
  
  //console.log(this.city);
  
  for (var product of this.city) {
    //console.log(product.name);
    this.cityNames.push(product.name);
    }

  //console.log(this.cityNames);  
  
}

  
  createBranchAdminForm : FormGroup; 
  user : User;


 
 private _filter(value: string)
  { 
    const filterValue = value.toLowerCase();
    return this.cityNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
}

  
  


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
              
          error =>{this.snackbar.open(error.error.title,'',{duration : 1000});}
                  )
      } 

  }

  Cancel()
  {
    this.createBranchAdminForm.reset();
    this.cancelBranchCreation.emit(false);
  }

 

}
