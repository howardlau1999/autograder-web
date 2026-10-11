import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  createProgrammingAssignmentForm,
  createSubmissionLimitForm,
  ProgrammingAssignmentForm,
  SubmissionLimitForm,
} from './programming-assignment-form';

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

  @Input() submissionLimitConfig: SubmissionLimitForm = createSubmissionLimitForm();

  @Input() formGroup: ProgrammingAssignmentForm = createProgrammingAssignmentForm();

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
