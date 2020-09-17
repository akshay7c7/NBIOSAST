import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-AddDriverDetails',
  templateUrl: './AddDriverDetails.component.html',
  styleUrls: ['../app.component.css']
})
export class AddDriverDetailsComponent implements OnInit {

  @Output() cancelDriverCreation = new EventEmitter();
  createDriverForm : FormGroup;
  constructor(private fb : FormBuilder, 
    private authService : AuthService,
    private snackbar : MatSnackBar) { }

  ngOnInit() {
  }

  

  Cancel()
  {
    //this.createDriverForm.reset();
    this.cancelDriverCreation.emit(false);
  }

  doc=true;
  hideDoc(data)
  {
    this.doc = data;
  }

}
