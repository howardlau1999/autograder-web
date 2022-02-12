import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';

export interface AssignmentCreateDialogData {
  courseId: number;
}

@Component({
  selector: 'app-assignment-course-create-dialog',
  templateUrl: './assignment-create-dialog.component.html',
  styleUrls: ['./assignment-create-dialog.component.css'],
})
export class AssignmentCreateDialogComponent implements OnInit {
  assignmentType: string = 'programming';

  courseId: number;

  programmingAssignmentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    releaseDate: new FormControl(DateTime.now()),
    dueDate: new FormControl(DateTime.now().plus({ days: 7 })),
    dockerImage: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<AssignmentCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssignmentCreateDialogData,
    private apiService: ApiService,
  ) {
    this.courseId = data.courseId;
  }

  ngOnInit(): void {}

  onConfirmClicked() {
    const { name, releaseDate, dueDate, description, dockerImage } =
      this.programmingAssignmentForm.value;
    this.apiService
      .createProgrammingAssignment(
        this.courseId,
        name,
        releaseDate,
        dueDate,
        description,
        dockerImage,
      )
      .subscribe((resp) => {
        this.dialogRef.close();
      });
  }

  onCancelClicked(): void {
    this.dialogRef.close();
  }
}
