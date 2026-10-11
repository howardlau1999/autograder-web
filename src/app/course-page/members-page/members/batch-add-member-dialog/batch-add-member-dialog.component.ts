import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-batch-add-member-dialog',
  templateUrl: './batch-add-member-dialog.component.html',
  styleUrls: ['./batch-add-member-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class BatchAddMemberDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<BatchAddMemberDialogComponent>) {}

  ngOnInit(): void {}

  onCancelClicked() {
    this.dialogRef.close();
  }
}
