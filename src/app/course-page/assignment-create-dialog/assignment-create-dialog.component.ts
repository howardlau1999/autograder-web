import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../api/api.service";

export interface CourseCreateDialogData {

}

@Component({
  selector: 'app-assignment-course-create-dialog',
  templateUrl: './assignment-create-dialog.component.html',
  styleUrls: ['./assignment-create-dialog.component.css']
})
export class AssignmentCreateDialogComponent implements OnInit {
  hours = Array(24).fill(0).map((_, i) => i);
  minutes = Array(60).fill(0).map((_, i) => i);
  constructor(private dialogRef: MatDialogRef<AssignmentCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CourseCreateDialogData,
              private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
  }

  onCancelClicked(): void {
    this.dialogRef.close();
  }
}
