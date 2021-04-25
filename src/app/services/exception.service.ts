import { ExceptionComponent } from './../components/exception/exception.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {

  constructor(private dialog: MatDialog) { }



  openConfirmDialog(msg){
    return  this.dialog.open(ExceptionComponent,{
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
