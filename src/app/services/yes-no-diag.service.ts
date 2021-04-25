import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { YesNoDialogComponent } from '../components/yes-no-dialog/yes-no-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class YesNoDiagService {

  constructor(private dialog: MatDialog) { }


  openConfirmDialog(msg){
  return  this.dialog.open(YesNoDialogComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: "10px"},
      disableClose: true,
      data: {
        message : msg,

      }
    });

  }

}
