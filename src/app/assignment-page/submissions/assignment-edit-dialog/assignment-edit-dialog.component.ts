import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { AssignmentService } from '../../../service/assignment.service';
import { Assignment } from '../../../api/proto/model_pb';
import { ErrorService } from '../../../service/error.service';

export interface AssignmentEditDialogData {
  assignmentId: number;
  assignment: Assignment;
}

@Component({
  selector: 'app-assignment-edit-dialog',
  templateUrl: './assignment-edit-dialog.component.html',
  styleUrls: ['./assignment-edit-dialog.component.css'],
})
export class AssignmentEditDialogComponent implements OnInit {
  loading: boolean = false;

  programmingAssignmentForm = new FormGroup({
    name: new FormControl(this.data.assignment.getName(), [Validators.required]),
    releaseDate: new FormControl(
      DateTime.fromJSDate(this.data.assignment.getReleaseDate()?.toDate() || new Date()),
    ),
    dueDate: new FormControl(
      DateTime.fromJSDate(this.data.assignment.getDueDate()?.toDate() || new Date()),
    ),
    dockerImage: new FormControl(this.data.assignment.getProgrammingConfig()?.getImage(), [
      Validators.required,
    ]),
    description: new FormControl(this.data.assignment.getDescription(), [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssignmentEditDialogData,
    private dialogRef: MatDialogRef<AssignmentEditDialogData>,
    private assignmentService: AssignmentService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {}

  onCancelClicked() {
    this.dialogRef.close();
  }

  onConfirmClicked() {
    this.loading = true;
    const { name, releaseDate, dueDate, description, dockerImage } =
      this.programmingAssignmentForm.value;
    const assignment = this.data.assignment.clone();
    assignment.setName(name);
    assignment.setReleaseDate(Timestamp.fromDate(releaseDate.toJSDate()));
    assignment.setDueDate(Timestamp.fromDate(dueDate.toJSDate()));
    assignment.setDescription(description);
    assignment.getProgrammingConfig()?.setImage(dockerImage);
    this.assignmentService
      .updateAssignment(this.data.assignmentId, assignment)
      .subscribe((result) => {
        this.loading = false;
        pipe(
          result,
          match(this.errorService.handleFormError(this.programmingAssignmentForm), () => {
            this.dialogRef.close(true);
          }),
        );
      });
  }
}
