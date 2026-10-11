import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { CourseService } from '../../../../service/course.service';
import { ErrorService } from '../../../../service/error.service';

@Component({
  selector: 'app-course-edit-dialog',
  templateUrl: './course-edit-dialog.component.html',
  styleUrls: ['./course-edit-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class CourseEditDialogComponent implements OnInit {
  loading: boolean = false;

  @Input() courseId!: number;

  @Input() name!: string;

  @Input() shortName!: string;

  @Input() description!: string;

  @Output() cancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  courseForm!: UntypedFormGroup;

  constructor(
    private courseService: CourseService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.courseForm = new UntypedFormGroup({
      name: new UntypedFormControl(this.name, [Validators.required]),
      shortName: new UntypedFormControl(this.shortName, [Validators.required]),
      description: new UntypedFormControl(this.description, [Validators.required]),
    });
  }

  onCancelClicked() {
    this.cancelled.emit(true);
  }

  onConfirmClicked() {
    this.loading = true;
    const { name, shortName, description } = this.courseForm.value;
    this.courseService
      .updateCourse(this.courseId, name, shortName, description)
      .subscribe((result) => {
        this.loading = false;
        pipe(
          result,
          match(this.errorService.handleFormError(this.courseForm), () => {
            this.confirmed.emit(true);
          }),
        );
      });
  }
}
