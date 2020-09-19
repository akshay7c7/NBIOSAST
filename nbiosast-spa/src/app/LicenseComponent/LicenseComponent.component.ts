import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Driver } from '../_models/Driver';

@Component({
  selector: 'app-LicenseComponent',
  templateUrl: './LicenseComponent.component.html',
  styleUrls: ['./LicenseComponent.component.css']
})
export class LicenseComponentComponent implements OnInit {

  constructor(private http : HttpClient, private activatedRoute : ActivatedRoute) { }
  isloading=false
  public driver ={};
  ngOnInit() {
    var snapshot = this.activatedRoute.snapshot;
    console.log(snapshot.params['id']);
    this.http.get("http://localhost:5000/api/driver/getdriver/"+snapshot.params['id'])
    .subscribe(
      data=>{
        this.driver = data;
        this.isloading = true;
      console.log(data)},
      error=>console.log(error.error)
    )
  }

}
