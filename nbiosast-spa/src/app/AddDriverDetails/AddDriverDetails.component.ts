import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Driver } from '../_models/Driver';
import { AuthService } from '../_services/auth.service';
import { DriverService } from '../_services/driver.service';

@Component({
  selector: 'app-AddDriverDetails',
  templateUrl: './AddDriverDetails.component.html',
  styleUrls: ['../app.component.css']
})
export class AddDriverDetailsComponent implements OnInit {

  @Output() cancelDriverCreation = new EventEmitter();
  createDriverForm : FormGroup;
  constructor(
    private fb : FormBuilder, 
    private authService : AuthService,
    private router : Router,
    private snackbar : MatSnackBar,
    private driverService : DriverService) { }

  ngOnInit() {
    this.CreateDriver();
  }

  CreateDriver()
  {
    this.createDriverForm = this.fb.group
    (
      {
        
        Name :['',Validators.required],
        Document : ['',Validators.required],      
        CertificateNo : ['',Validators.required],
        LicenseNo :['',Validators.required],
        TransPortName :['',Validators.required],
        TransPortAddress :['',Validators.required],
        TransPortPhoneNo :['',Validators.required],
        Address :['',Validators.required],
        Amount :['',Validators.required],
        PaymentType :['',Validators.required],
        DOB :['',Validators.required],
        TrainingStartDate :['',Validators.required],
        TrainingEndDate :['',Validators.required],
        TrainingPeriod :['',Validators.required],
        Photo :['',Validators.required],             
        OneDayDoc: [''] 

      }

    )
  }

  selectedDocument:File;
  selectedOneDayDoc: File;
  selectedPhoto: File;
  onFileChangeDocument(event) {
  
    this.selectedDocument = <File>event.target.files[0];
  }

  onFileChangeOneDayDoc(event) {
  
    this.selectedOneDayDoc = <File>event.target.files[0];
  }

  onFileChangePhoto(event) {
  
    this.selectedPhoto = <File>event.target.files[0];
  }



  SaveDriver()
  {
      const formData = new FormData();
      formData.append('Document', this.selectedDocument);
      formData.append('OnedayDoc', this.selectedOneDayDoc);
      formData.append('Photo', this.selectedPhoto);
      formData.append('Name', this.createDriverForm.get('Name').value);
      formData.append('Address', this.createDriverForm.get('Address').value);

      this.driverService.SaveDriver(formData)
      .subscribe(
        ()=>{
          this.snackbar.open('Driver details added Successfully','',{duration : 1000});
          this.createDriverForm.reset();
            },
            
        error =>{this.snackbar.open(error.error,'',{duration : 1000});}
                )

  }




 

  



  Cancel()
  {
    this.createDriverForm.reset();
    this.cancelDriverCreation.emit(false);
    this.router.navigate['/driverdetails'];
  }

  doc=true;
  hideDoc(data)
  {
    this.doc = data;
  }

}
