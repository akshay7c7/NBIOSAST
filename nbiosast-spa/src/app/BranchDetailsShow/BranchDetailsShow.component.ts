import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-BranchDetailsShow',
  templateUrl: './BranchDetailsShow.component.html',
  styleUrls: ['../app.component.css']
})
export class BranchDetailsShowComponent implements OnInit {

  constructor(private userService : UserService,
              private snacker : MatSnackBar) { }

  ngOnInit() {
    this.GetBranchAdminDetails();
  }

  
  addBranchAdminMode = false;

  AddBranchAdmin()
  {
    this.addBranchAdminMode=true;
  }
  cancelBranchCreation(creation : boolean)
  {
    this.addBranchAdminMode = creation;
  }

  headers =["name", "email", "userName","city"];
  branchAdmin : any=[];
  GetBranchAdminDetails()
  {
    this.userService.GetBranchAdminsDetails()
    .subscribe(
      data => {
        console.log(data);
        this.branchAdmin = data;
      },
      error=>{
          this.snacker.open(error.error,'',{duration: 1000});
      }
    )
  }


}
