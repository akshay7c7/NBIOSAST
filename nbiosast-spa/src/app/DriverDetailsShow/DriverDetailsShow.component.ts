import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Driver } from '../_models/Driver';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-DriverDetailsShow',
  templateUrl: './DriverDetailsShow.component.html',
  styleUrls: ['../app.component.css']
})
export class DriverDetailsShowComponent implements OnInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;

  DisplayedColumns : string[]= ['id','name','address','photo','status','actions'];
  showLoading = true;
  Driver: MatTableDataSource<any>
  imageSrc;
  searchKey;
  
  constructor(private userService : UserService,
              private snacker : MatSnackBar, 
              private route : ActivatedRoute, 
              private router : Router,
              private http: HttpClient) { }
  
  ngOnInit() {
    this.route.data
    .subscribe(
      data=>{
        let array = data['driverDetails'];
        this.Driver = new MatTableDataSource(array);
        this.showLoading = false;
      }
    )
  }

  ngAfterViewInit(): void {
    this.Driver.paginator = this.paginator;
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

 
  
  
  ClearIt()
  {
    this.searchKey = "";
  }
  
  applyFilter()
  {
    this.Driver.filter = this.searchKey.trim().toLowerCase();
  }
  


}
