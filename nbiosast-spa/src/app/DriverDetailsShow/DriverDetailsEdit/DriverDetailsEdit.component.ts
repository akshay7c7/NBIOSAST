import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { DriverService } from 'src/app/_services/driver.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-DriverDetailsEdit',
  templateUrl: './DriverDetailsEdit.component.html',
  styleUrls: ['../../app.component.css']
})
export class DriverDetailsEditComponent implements OnInit {

  createDriverForm : FormGroup;
  public user: User = {} as User;

  constructor(
    private fb : FormBuilder, 
    private authService : AuthService,
    private router : Router,
    private snackbar : MatSnackBar,
    private driverService : DriverService,
    private route : ActivatedRoute,
    private userService : UserService) { }

  ngOnInit() {
    this.CreateDriver();
    this.userService.GetUserDetail(this.authService.decodedToken.nameid)
    .subscribe(
      data=>
      {
        console.log(data);
        this.user = data;
      }
    )
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
      formData.append('CertificateNo', this.createDriverForm.get('CertificateNo').value);
      formData.append('LicenseNo', this.createDriverForm.get('LicenseNo').value);
      formData.append('TransPortName', this.createDriverForm.get('TransPortName').value);
      formData.append('TransPortAddress', this.createDriverForm.get('TransPortAddress').value);
      formData.append('TransPortPhoneNo', this.createDriverForm.get('TransPortPhoneNo').value);
      formData.append('Amount', this.createDriverForm.get('Amount').value);
      formData.append('PaymentType', this.createDriverForm.get('PaymentType').value);
      formData.append('DOB', this.createDriverForm.get('DOB').value);
      formData.append('TrainingStartDate', this.createDriverForm.get('TrainingStartDate').value);
      formData.append('TrainingEndDate', this.createDriverForm.get('TrainingEndDate').value);
      formData.append('TrainingPeriod', this.createDriverForm.get('TrainingPeriod').value);
      formData.append('BranchVisited', this.user.city);
      

      this.driverService.UpdateDriver(formData)
      .subscribe(
        ()=>{
          this.snackbar.open('Driver details updated Successfully','',{duration : 1000});
          this.createDriverForm.reset();
            },
            
        error =>{
          console.log(error);
          this.snackbar.open(error.message,'',{duration : 1000});}
                )

  }

  Cancel()
  {
    this.createDriverForm.reset();
    //this.cancelDriverCreation.emit(false);
    console.log("Cancel");
    this.router.navigate(['/driverdetails']);
  }

  doc=true;
  hideDoc(data)
  {
    this.doc = data;
  }

  diffDays
  GetValidity()
  {
    var time = new Date(this.createDriverForm.get('TrainingEndDate').value).getTime() - new Date(this.createDriverForm.get('TrainingStartDate').value).getTime();
    this.diffDays = Math.ceil(time / (365 * 1000 * 3600 * 24)); 
  }

}
