import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { MatChipInputEvent } from '@angular/material/chips';
import { AssignmentDateValidator } from '../../../course-page/assignments-page/assignments/assignment-create-dialog/assignment-create-dialog.component';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './programming-assignment-form.component.html',
  styleUrls: ['./programming-assignment-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ProgrammingAssignmentFormComponent implements OnInit {
  assignmentType: string = 'programming';

  addOnBlur = true;

  loading: boolean = false;

  @Input() tags: string[] = [];

  @Output() tagsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input() submissionLimitConfig = new UntypedFormGroup({
    total: new UntypedFormControl(0),
    frequency: new UntypedFormControl(0),
    period: new UntypedFormControl(0),
  });

  @Input() formGroup = new UntypedFormGroup(
    {
      name: new UntypedFormControl('', [Validators.required]),
      releaseDate: new UntypedFormControl(DateTime.now()),
      dueDate: new UntypedFormControl(DateTime.now().plus({ days: 7 })),
      dockerImage: new UntypedFormControl('', [Validators.required]),
      cpu: new UntypedFormControl(1, [
        Validators.required,
        Validators.min(0.5),
        Validators.max(64),
      ]),
      memory: new UntypedFormControl(4096, [
        Validators.required,
        Validators.min(128),
        Validators.max(65536),
      ]),
      uploadLimit: new UntypedFormControl(128, [
        Validators.required,
        Validators.min(1),
        Validators.max(8192),
      ]),
      timeout: new UntypedFormControl(600, [
        Validators.required,
        Validators.min(1),
        Validators.max(18000),
      ]),
      description: new UntypedFormControl('', [Validators.required]),
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

  ngOnInit(): void {}
}
