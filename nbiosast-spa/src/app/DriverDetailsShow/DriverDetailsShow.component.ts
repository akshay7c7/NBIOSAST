import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-DriverDetailsShow',
  templateUrl: './DriverDetailsShow.component.html',
  styleUrls: ['../app.component.css']
})
export class DriverDetailsShowComponent implements OnInit {

  constructor(private userService : UserService,
              private snacker : MatSnackBar, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.route.data
    .subscribe(
      data=>{this.Driver = data['DriverDetails'];}
    )
  }

  
  addDriverMode = false;

  AddDriver()
  {
    this.addDriverMode=true;
  }
  cancelDriverCreation(creation : boolean)
  {
    this.addDriverMode = creation;
  }

  headers =["name", "email", "userName","city"];
  Driver: MatTableDataSource<any>;
  DisplayedColumns : string[]= ['fullname']
  


}
