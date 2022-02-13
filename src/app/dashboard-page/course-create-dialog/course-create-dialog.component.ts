import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'fp-ts/function';
import { match } from 'fp-ts/Either';
import { CourseService } from '../../service/course.service';
import { ErrorService } from '../../service/error.service';

@Component({
  selector: 'app-assignment-course-create-dialog',
  templateUrl: './course-create-dialog.component.html',
  styleUrls: ['./course-create-dialog.component.css'],
})
export class CourseCreateDialogComponent implements OnInit {
  creating: boolean = false;

  courseForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    shortName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CourseCreateDialogComponent>,
    private courseService: CourseService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {}

  onCreateClicked() {
    this.creating = true;
    const { name, shortName, description } = this.courseForm.value;
    this.courseService.createCourse(name, shortName, description).subscribe((result) => {
      this.creating = false;
      pipe(
        result,
        match(this.errorService.handleFormError(this.courseForm), (resp) => {
          this.dialogRef.close(resp.getCourseId());
        }),
      );
    });
  }

  onCancelClicked() {
    this.dialogRef.close(null);
  }
}
