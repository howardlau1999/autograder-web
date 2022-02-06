import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {
  courseCreateForm = this.formBuilder.group({
    'name': '',
    'shortName': '',
    'description': '',
  });
  constructor(private dialogRef: MatDialogRef<CreateDialogComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
