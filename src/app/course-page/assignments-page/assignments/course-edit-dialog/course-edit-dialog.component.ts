import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { CourseService } from '../../../../service/course.service';
import { ErrorService } from '../../../../service/error.service';
import { CourseForm, createCourseForm } from '../../../../common/course-form/course-form';

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

  courseForm!: CourseForm;

  constructor(
    private courseService: CourseService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.courseForm = createCourseForm({
      name: this.name,
      shortName: this.shortName,
      description: this.description,
    });
  }

  onCancelClicked() {
    this.cancelled.emit(true);
  }

  onConfirmClicked() {
    this.loading = true;
    const { name, shortName, description } = this.courseForm.getRawValue();
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
