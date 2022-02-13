import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { CourseService } from '../../../service/course.service';
import { ErrorService } from '../../../service/error.service';

export interface CourseEditDialogData {
  courseId: number;
  name: string;
  shortName: string;
  description: string;
}

@Component({
  selector: 'app-course-edit-dialog',
  templateUrl: './course-edit-dialog.component.html',
  styleUrls: ['./course-edit-dialog.component.css'],
})
export class CourseEditDialogComponent implements OnInit {
  loading: boolean = false;

  courseForm = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required]),
    shortName: new FormControl(this.data.shortName, [Validators.required]),
    description: new FormControl(this.data.description, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CourseEditDialogData,
    private dialogRef: MatDialogRef<CourseEditDialogComponent>,
    private courseService: CourseService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {}

  onCancelClicked() {
    this.dialogRef.close();
  }

  onConfirmClicked() {
    this.loading = true;
    const { name, shortName, description } = this.courseForm.value;
    this.courseService
      .updateCourse(this.data.courseId, name, shortName, description)
      .subscribe((result) => {
        this.loading = false;
        pipe(
          result,
          match(this.errorService.handleFormError(this.courseForm), () => {
            this.dialogRef.close(true);
          }),
        );
      });
  }
}
