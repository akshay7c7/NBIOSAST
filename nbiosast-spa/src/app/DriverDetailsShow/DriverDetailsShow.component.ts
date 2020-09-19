import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Driver } from '../_models/Driver';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../_services/dialog.service';

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
              private http: HttpClient,
              private dialogService : DialogService) { }
  
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


  ApproveDriver()
  {

  }

  ConfirmPayment()
  {

  }

  DeleteDriver(element)
  {
    this.dialogService.openConfirmDialog("Do you want to delete this Driver details?").afterClosed().subscribe(
      res=>{
        if(res)
        {//call delete service api
          this.Driver.data = this.Driver.data
          .filter((value,key)=>{
            return value.id != element.id;
          });
          this.snacker.open('Driver Deleted successfully','',{duration: 1000})
        }
      }
    )
  }

  EditDriver()
  {

  }

  PrintDriver(element)
  {
      
      this.router.navigate(['/license']);
  }
  


}
