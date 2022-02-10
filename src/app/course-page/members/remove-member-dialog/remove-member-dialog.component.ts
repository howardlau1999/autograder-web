import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-remove-member-dialog',
  templateUrl: './remove-member-dialog.component.html',
  styleUrls: ['./remove-member-dialog.component.css']
})
export class RemoveMemberDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RemoveMemberDialogComponent>) { }

  ngOnInit(): void {
  }

  onConfirmClicked() {
    this.dialogRef.close(true);
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
