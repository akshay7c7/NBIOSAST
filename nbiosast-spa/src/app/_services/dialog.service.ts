import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogueComponent } from '../ConfirmDialogue/ConfirmDialogue.component';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

constructor(private matDialog : MatDialog) { }

  openConfirmDialog(msg)
  {
    return this.matDialog.open(ConfirmDialogueComponent,{
      width : '390px',
      panelClass : 'confirm-dialog-container',
      disableClose : true,
      data : {
        message : msg
      }
    });
  }
}




