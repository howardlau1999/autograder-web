import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { AssignmentService } from '../../../service/assignment.service';
import { ErrorService } from '../../../service/error.service';
import { SubmissionLimitConfig } from '../../../api/proto/model_pb';

export interface AssignmentCreateDialogData {
  courseId: number;
}

export const AssignmentDateValidator: ValidatorFn = (group): ValidationErrors => {
  const releaseDateControl = group.get('releaseDate');
  const dueDateControl = group.get('dueDate');
  const releaseDate: DateTime = releaseDateControl?.value || DateTime.now();
  const dueDate: DateTime = dueDateControl?.value || DateTime.now();
  if (dueDate.toJSDate() < releaseDate.toJSDate()) {
    dueDateControl?.setErrors({ before: true });
    return { dueDate: true };
  }
  return {};
};

@Component({
  selector: 'app-assignment-course-create-dialog',
  templateUrl: './assignment-create-dialog.component.html',
  styleUrls: ['./assignment-create-dialog.component.css'],
})
export class AssignmentCreateDialogComponent implements OnInit {
  assignmentType: string = 'programming';

  loading: boolean = false;

  courseId: number;

  tags: string[] = [];

  submissionLimitForm = new FormGroup({
    total: new FormControl(0),
    frequency: new FormControl(),
    period: new FormControl(),
  });

  programmingAssignmentForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      releaseDate: new FormControl(DateTime.now()),
      dueDate: new FormControl(DateTime.now().plus({ days: 7 })),
      dockerImage: new FormControl('', [Validators.required]),
      cpu: new FormControl(1, [Validators.required, Validators.min(0.5), Validators.max(8)]),
      memory: new FormControl(4096, [
        Validators.required,
        Validators.min(128),
        Validators.max(8192),
      ]),
      timeout: new FormControl(600, [Validators.required, Validators.min(1), Validators.max(6000)]),
      description: new FormControl('', [Validators.required]),
    },
    { validators: [AssignmentDateValidator] },
  );

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
    const { name, releaseDate, dueDate, description, dockerImage, cpu, memory, timeout } =
      this.programmingAssignmentForm.value;
    const { total, period, frequency } = this.submissionLimitForm.value;
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
