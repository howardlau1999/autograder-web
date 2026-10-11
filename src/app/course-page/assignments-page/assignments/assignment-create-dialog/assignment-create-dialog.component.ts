import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { AssignmentService } from '../../../../service/assignment.service';
import { ErrorService } from '../../../../service/error.service';
import { SubmissionLimitConfig } from '../../../../api/proto/model_pb';
import {
  createProgrammingAssignmentForm,
  createSubmissionLimitForm,
} from '../../../../common/assignment-form/programming/programming-assignment-form';

export interface AssignmentCreateDialogData {
  courseId: number;
}

@Component({
  selector: 'app-assignment-course-create-dialog',
  templateUrl: './assignment-create-dialog.component.html',
  styleUrls: ['./assignment-create-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AssignmentCreateDialogComponent implements OnInit {
  assignmentType: string = 'programming';

  loading: boolean = false;

  courseId: number;

  tags: string[] = [];

  submissionLimitForm = createSubmissionLimitForm();

  programmingAssignmentForm = createProgrammingAssignmentForm();

  constructor(
    private dialogRef: MatDialogRef<AssignmentCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssignmentCreateDialogData,
    private assignmentService: AssignmentService,
    private errorService: ErrorService,
  ) {
    this.courseId = data.courseId;
  }

  ngOnInit(): void {}

  onConfirmClicked() {
    const {
      name,
      releaseDate,
      dueDate,
      description,
      dockerImage,
      cpu,
      memory,
      timeout,
      uploadLimit,
    } = this.programmingAssignmentForm.getRawValue();
    const { total, period, frequency } = this.submissionLimitForm.getRawValue();
    const submissionLimit = new SubmissionLimitConfig();
    submissionLimit.setPeriod(period);
    submissionLimit.setFrequency(frequency);
    submissionLimit.setTotal(total);
    this.loading = true;
    this.assignmentService
      .createProgrammingAssignment(
        this.courseId,
        name,
        releaseDate,
        dueDate,
        description,
        dockerImage,
        this.tags,
        cpu,
        memory,
        timeout,
        submissionLimit,
        uploadLimit,
      )
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

  onCancelClicked(): void {
    this.dialogRef.close();
  }
}
