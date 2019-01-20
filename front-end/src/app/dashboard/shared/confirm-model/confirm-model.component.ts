import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'raadmin-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrls: ['./confirm-model.component.scss']
})
export class ConfirmModelComponent implements OnInit {
    confirmTitle: string;
    confirmSubtitle: string;
    closeButtonTitle: string;
    actionButtonTitle: string;
  constructor(public dialogRef: MatDialogRef<ConfirmModelComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.confirmTitle = this.data.title;
    this.confirmSubtitle = this.data.subtitle;
    this.closeButtonTitle = this.data.close;
    this.actionButtonTitle = this.data.actionTitle;
  }

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }

  confirmOk(): void {
    this.dialogRef.close(true);
  }

}

export interface DialogData {
  title: string;
  subtitle: string;
  close: string;
  actionTitle: string;
}

