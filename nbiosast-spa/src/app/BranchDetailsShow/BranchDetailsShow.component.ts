import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-BranchDetailsShow',
  templateUrl: './BranchDetailsShow.component.html',
  styleUrls: ['../app.component.css']
})
export class BranchDetailsShowComponent implements OnInit {

  constructor(private userService : UserService,
              private snacker : MatSnackBar, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.route.data
    .subscribe(
      data=>{this.branchAdmin = data['branchDetails']}
    )
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
  


}
