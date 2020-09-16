import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-AddDriverDetails',
  templateUrl: './AddDriverDetails.component.html',
  styleUrls: ['../app.component.css']
})
export class AddDriverDetailsComponent implements OnInit {

  @Output() cancelDriverCreation = new EventEmitter();
  createDriverForm : FormGroup;
  constructor() { }

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
