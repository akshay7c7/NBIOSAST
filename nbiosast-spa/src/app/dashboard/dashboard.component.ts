import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dashboard } from '../_models/Dashboard';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../app.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashService : DashboardService,
    private snackbar : MatSnackBar) { }

  ngOnInit() {
    this.GetTodaysData();
  }

  DashData :Dashboard={} as Dashboard;
  GetTodaysData()
  {
    
    this.dashService.GetTodaysDetails()
    .subscribe(
      data=>
      {
        console.log(data)
        this.DashData = data
        this.snackbar.open("Dashboard Updated",'',{duration:1000})
      },
      error=>
      {
        this.snackbar.open("Error updating Dashboard",'',{duration:1000})
      }
    )
  }
  

}
