import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface RemoveMemberDialogData {
  nickname: string;
  email: string;
}

@Component({
  selector: 'app-remove-member-dialog',
  templateUrl: './remove-member-dialog.component.html',
  styleUrls: ['./remove-member-dialog.component.css'],
})
export class RemoveMemberDialogComponent implements OnInit {
  nickname: string;

  email: string;

  constructor(
    private dialogRef: MatDialogRef<RemoveMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RemoveMemberDialogData,
  ) {
    this.nickname = data.nickname;
    this.email = data.email;
  }

  ngOnInit(): void {}

  onConfirmClicked() {
    this.dialogRef.close(true);
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
