import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-batch-add-member-dialog',
  templateUrl: './batch-add-member-dialog.component.html',
  styleUrls: ['./batch-add-member-dialog.component.css'],
})
export class BatchAddMemberDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<BatchAddMemberDialogComponent>) {}

  ngOnInit(): void {}

  onCancelClicked() {
    this.dialogRef.close();
  }
}
