import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { CourseService } from '../../../../service/course.service';
import { ErrorService } from '../../../../service/error.service';

@Component({
  selector: 'app-course-edit-dialog',
  templateUrl: './course-edit-dialog.component.html',
  styleUrls: ['./course-edit-dialog.component.css'],
})
export class CourseEditDialogComponent implements OnInit {
  loading: boolean = false;

  @Input() courseId!: number;

  @Input() name!: string;

  @Input() shortName!: string;

  @Input() description!: string;

  @Output() cancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  courseForm!: FormGroup;

  constructor(private courseService: CourseService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      shortName: new FormControl(this.shortName, [Validators.required]),
      description: new FormControl(this.description, [Validators.required]),
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
