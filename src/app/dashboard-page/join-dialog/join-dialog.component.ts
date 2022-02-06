import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-join-dialog',
  templateUrl: './join-dialog.component.html',
  styleUrls: ['./join-dialog.component.css']
})
export class JoinDialogComponent implements OnInit {
  invitationCode = new FormControl('');

  constructor(private dialogRef: MatDialogRef<JoinDialogComponent>) { }

  ngOnInit(): void {
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
