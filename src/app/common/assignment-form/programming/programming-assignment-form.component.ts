import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { MatChipInputEvent } from '@angular/material/chips';
import { AssignmentDateValidator } from '../../../course-page/assignments-page/assignments/assignment-create-dialog/assignment-create-dialog.component';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './programming-assignment-form.component.html',
  styleUrls: ['./programming-assignment-form.component.css'],
})
export class ProgrammingAssignmentFormComponent implements OnInit {
  assignmentType: string = 'programming';

  addOnBlur = true;

  loading: boolean = false;

  @Input() tags: string[] = [];

  @Output() tagsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input() submissionLimitConfig = new FormGroup({
    total: new FormControl(0),
    frequency: new FormControl(0),
    period: new FormControl(0),
  });

  @Input() formGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      releaseDate: new FormControl(DateTime.now()),
      dueDate: new FormControl(DateTime.now().plus({ days: 7 })),
      dockerImage: new FormControl('', [Validators.required]),
      cpu: new FormControl(1, [Validators.required, Validators.min(0.5), Validators.max(64)]),
      memory: new FormControl(4096, [
        Validators.required,
        Validators.min(128),
        Validators.max(65536),
      ]),
      timeout: new FormControl(600, [
        Validators.required,
        Validators.min(1),
        Validators.max(18000),
      ]),
      description: new FormControl('', [Validators.required]),
    },
    { validators: [AssignmentDateValidator] },
  );

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
      this.tagsChange.next(this.tags);
    }
    event.chipInput?.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagsChange.next(this.tags);
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
