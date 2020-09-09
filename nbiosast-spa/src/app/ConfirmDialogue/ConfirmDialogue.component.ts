import { Component, OnInit , Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef, MatDialogConfig} from '@angular/material/dialog';


@Component({
  selector: 'app-ConfirmDialogue',
  templateUrl: './ConfirmDialogue.component.html',
  styleUrls: ['./ConfirmDialogue.component.css']
})
export class ConfirmDialogueComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef:MatDialogRef<ConfirmDialogueComponent>) { }

  ngOnInit() {
  }

  closeDialog()
  {
    this.dialogRef.close();
  }

 
}
