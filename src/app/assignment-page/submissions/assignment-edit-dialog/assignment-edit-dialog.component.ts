import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { Subscription } from 'rxjs';
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

  @Input() assignment!: Assignment;

  @Input() assignmentId!: number;

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() cancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

  programmingAssignmentForm!: FormGroup;

  tags: string[] = [];

  updateSubscription?: Subscription;

  constructor(private assignmentService: AssignmentService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.tags = this.assignment.getProgrammingConfig()?.getTagsList() || [];
    this.programmingAssignmentForm = new FormGroup({
      name: new FormControl(this.assignment.getName(), [Validators.required]),
      releaseDate: new FormControl(
        DateTime.fromJSDate(this.assignment.getReleaseDate()?.toDate() || new Date()),
      ),
      dueDate: new FormControl(
        DateTime.fromJSDate(this.assignment.getDueDate()?.toDate() || new Date()),
      ),
      dockerImage: new FormControl(this.assignment.getProgrammingConfig()?.getImage(), [
        Validators.required,
      ]),
      cpu: new FormControl(this.assignment.getProgrammingConfig()?.getCpu(), [
        Validators.required,
        Validators.min(0.5),
        Validators.max(8),
      ]),
      memory: new FormControl(
        Math.round((this.assignment.getProgrammingConfig()?.getMemory() || 0) / 1024 / 1024),
        [Validators.required, Validators.min(128), Validators.max(8192)],
      ),
      timeout: new FormControl(this.assignment.getProgrammingConfig()?.getTimeout(), [
        Validators.required,
        Validators.min(1),
        Validators.max(6000),
      ]),
      description: new FormControl(this.assignment.getDescription(), [Validators.required]),
    });
  }

  onCancelClicked() {
    this.cancelled.emit(true);
  }

  onConfirmClicked() {
    this.loading = true;
    const { name, releaseDate, dueDate, description, dockerImage, cpu, memory, timeout } =
      this.programmingAssignmentForm.value;
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
