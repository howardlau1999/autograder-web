import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../api/api.service";
import {DateTime} from "luxon";

export interface AssignmentCreateDialogData {
  courseId: number
}

@Component({
  selector: 'app-assignment-course-create-dialog',
  templateUrl: './assignment-create-dialog.component.html',
  styleUrls: ['./assignment-create-dialog.component.css']
})
export class AssignmentCreateDialogComponent implements OnInit {
  releaseDate: DateTime = DateTime.now();
  dueDate: DateTime = DateTime.now().plus({days: 7});
  assignmentType: string = 'programming';
  name: string = '';
  dockerImage: string = '';
  description: string = '';
  courseId: number;

  constructor(private dialogRef: MatDialogRef<AssignmentCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AssignmentCreateDialogData,
              private apiService: ApiService
  ) {
    this.courseId = data.courseId;
  }

  ngOnInit(): void {
  }

  onConfirmClicked() {
    this.apiService.createProgrammingAssignment(this.courseId,
      this.name,
      this.releaseDate,
      this.dueDate,
      this.description,
      this.dockerImage,
    ).subscribe(resp => {
      console.log(resp.toString());
      this.dialogRef.close();
    });
  }

  onCancelClicked(): void {
    this.dialogRef.close();
  }
}
