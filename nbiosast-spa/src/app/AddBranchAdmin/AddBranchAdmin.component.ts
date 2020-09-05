import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-AddBranchAdmin',
  templateUrl: './AddBranchAdmin.component.html',
  styleUrls: ['../app.component.css']
})
export class AddBranchAdminComponent implements OnInit {

  @Output() cancelBranchCreation = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
   
  addBranchMode = false;
  cancel()
  {
    this.cancelBranchCreation.emit(false);
  }

}
