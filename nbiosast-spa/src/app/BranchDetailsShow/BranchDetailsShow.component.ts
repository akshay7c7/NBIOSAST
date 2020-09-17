import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-BranchDetailsShow',
  templateUrl: './BranchDetailsShow.component.html',
  styleUrls: ['../app.component.css']
})
export class BranchDetailsShowComponent implements OnInit, AfterViewInit {

@ViewChild(MatPaginator) paginator : MatPaginator;

DisplayedColumns =["city","drivers", "nameAdmin", "userName", "email", "action"];
showLoading = true;
branchAdmin : MatTableDataSource<any>
searchKey;

  constructor(private userService : UserService,
              private snacker : MatSnackBar, 
              private route : ActivatedRoute, 
              private router : Router,
              private ngZone : NgZone,
              ) { }

  ngOnInit() {
    this.route.data
    .subscribe(
      data=>{
        let array = data['branchDetails'];
        this.branchAdmin = new MatTableDataSource(array);
        this.showLoading = false;
      }
    )
    
  }

  ngAfterViewInit(): void {
    this.branchAdmin.paginator = this.paginator;
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

  ClearIt()
  {
    this.searchKey = "";
  }
  
  applyFilter()
  {
    this.branchAdmin.filter = this.searchKey.trim().toLowerCase();
  }

}
