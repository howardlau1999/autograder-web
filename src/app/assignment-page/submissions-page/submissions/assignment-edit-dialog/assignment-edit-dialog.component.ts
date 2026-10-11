import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DateTime } from 'luxon';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { Subscription } from 'rxjs';
import { AssignmentService } from '../../../../service/assignment.service';
import { Assignment, SubmissionLimitConfig } from '../../../../api/proto/model_pb';
import { ErrorService } from '../../../../service/error.service';
import {
  createProgrammingAssignmentForm,
  createSubmissionLimitForm,
  ProgrammingAssignmentForm,
  SubmissionLimitForm,
} from '../../../../common/assignment-form/programming/programming-assignment-form';

@Component({
  selector: 'app-assignment-edit-dialog',
  templateUrl: './assignment-edit-dialog.component.html',
  styleUrls: ['./assignment-edit-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AssignmentEditDialogComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  @Input() assignment!: Assignment;

  @Input() assignmentId!: number;

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() cancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

  programmingAssignmentForm!: ProgrammingAssignmentForm;

  submissionLimitConfig!: SubmissionLimitForm;

  tags: string[] = [];

  updateSubscription?: Subscription;

  constructor(
    private assignmentService: AssignmentService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.tags = this.assignment.getProgrammingConfig()?.getTagsList() || [];
    const limit = this.assignment.getSubmissionLimit();
    this.submissionLimitConfig = createSubmissionLimitForm({
      total: limit?.getTotal() || 0,
      frequency: limit?.getFrequency() || 0,
      period: limit?.getPeriod() || 0,
    });
    const config = this.assignment.getProgrammingConfig();
    this.programmingAssignmentForm = createProgrammingAssignmentForm({
      name: this.assignment.getName(),
      releaseDate: DateTime.fromJSDate(this.assignment.getReleaseDate()?.toDate() || new Date()),
      dueDate: DateTime.fromJSDate(this.assignment.getDueDate()?.toDate() || new Date()),
      dockerImage: config?.getImage() || '',
      cpu: config?.getCpu() || 0,
      memory: Math.round((config?.getMemory() || 0) / 1024 / 1024),
      uploadLimit: Math.round(this.assignment.getUploadLimit() / 1024),
      timeout: config?.getTimeout() || 0,
      description: this.assignment.getDescription(),
    });
  }

  onCancelClicked() {
    this.cancelled.emit(true);
  }

  onConfirmClicked() {
    this.loading = true;
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
    const { total, period, frequency } = this.submissionLimitConfig.getRawValue();
    const submissionLimit = this.assignment.getSubmissionLimit() || new SubmissionLimitConfig();
    const assignment = this.assignment.clone();
    assignment.setName(name);
    assignment.setReleaseDate(Timestamp.fromDate(releaseDate.toJSDate()));
    assignment.setDueDate(Timestamp.fromDate(dueDate.toJSDate()));
    assignment.setDescription(description);
    assignment.getProgrammingConfig()?.setTagsList(this.tags);
    assignment.getProgrammingConfig()?.setImage(dockerImage);
    assignment.getProgrammingConfig()?.setCpu(cpu);
    assignment.getProgrammingConfig()?.setMemory(memory * 1024 * 1024);
    assignment.getProgrammingConfig()?.setTimeout(timeout);
    submissionLimit.setTotal(total);
    submissionLimit.setFrequency(frequency);
    submissionLimit.setPeriod(period);
    assignment.setSubmissionLimit(submissionLimit);
    assignment.setUploadLimit(uploadLimit * 1024);
    this.updateSubscription?.unsubscribe();
    this.updateSubscription = this.assignmentService
      .updateAssignment(this.assignmentId, assignment)
      .subscribe((result) => {
        this.loading = false;
        pipe(
          result,
          match(this.errorService.handleFormError(this.programmingAssignmentForm), () => {
            this.confirmed.emit(true);
          }),
        );
      });
  }

  ngOnDestroy() {
    this.updateSubscription?.unsubscribe();
  }
}
