import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmModelComponent } from './confirm-model/confirm-model.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  selectedFleet: any;
  constructor(public dialog: MatDialog) {}
  private data1 = new Subject();
  public confirmModal(title, subtitle, actionTitle, closeTitle): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmModelComponent, {
      height: '250px',
      width: '350px',
      data: {
        title: title,
        subtitle: subtitle,
        actionTitle: actionTitle,
        close: closeTitle
      }
    });

    return dialogRef.afterClosed();
  }

}
