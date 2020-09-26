
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Driver } from '../_models/Driver';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../_services/dialog.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LicenseComponentComponent } from '../LicenseComponent/LicenseComponent.component';
import { AuthService } from '../_services/auth.service';
import { DriverService } from '../_services/driver.service';

@Component({
  selector: 'app-Reports',
  templateUrl: './Reports.component.html',
  styleUrls: ['../app.component.css']
})
export class ReportsComponent implements OnInit  , AfterViewInit {

  @ViewChild(MatPaginator) paginator : MatPaginator;
  
  EmptyData = false;
  DisplayedColumns : string[]= ['id','name','address','photo','status','actions'];
  showLoading = true;
  Driver: MatTableDataSource<any>
  imageSrc;
  searchKey;
  
  constructor(private userService : UserService,
              private snacker : MatSnackBar, 
              public authService : AuthService,
              private route : ActivatedRoute, 
              private router : Router,
              private http: HttpClient,
              private dialogService : DialogService,
              private dialog : MatDialog,
              private driverService : DriverService
              ) { }
  
  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.loadUsers();
  }

  fff:any;
  branch: string = "Mumbai";
  loadUsers()
  {
    this.driverService.getDrivers(this.branch)
    .subscribe
    (
      data=>{
        console.log(data);
        this.fff =  data;
        this.Driver = new MatTableDataSource<any>(this.fff);
        this.showLoading = false;
        this.Driver.paginator = this.paginator;
        if(data==""){
          this.EmptyData=true;
        }
      }
    )

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
