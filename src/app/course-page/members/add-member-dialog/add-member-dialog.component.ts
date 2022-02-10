import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.css']
})
export class AddMemberDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddMemberDialogComponent>) { }

  ngOnInit(): void {
  }

  onCancelClicked() {
    this.dialogRef.close();
  }

  onConfirmClicked() {

  }
}
