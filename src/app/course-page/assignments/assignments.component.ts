import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Course, CourseRole } from '../../api/proto/model_pb';
import { AssignmentCreateDialogComponent } from '../assignment-create-dialog/assignment-create-dialog.component';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  course$: Observable<Course | undefined>;

  courseId$: Observable<number>;

  courseId: number = 0;

  canWriteCourse: boolean;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.canWriteCourse = false;
    this.courseId$ = this.route.parent!.paramMap.pipe(
      map((params) => Number.parseInt(params.get('courseId') || '0', 10)),
      tap((courseId) => {
        this.courseId = courseId;
      }),
    );
    this.course$ = this.courseId$.pipe(
      switchMap((courseId) => this.courseService.getCourse(courseId)),
      tap((resp) => {
        this.canWriteCourse = resp.getRole() === CourseRole.INSTRUCTOR;
      }),
      map((resp) => resp.getCourse()),
    );
  }

  ngOnInit() {}

  gotoAdmin() {
    this.router.navigate(['admin'], { relativeTo: this.route }).then();
  }

  onAddAssignmentClicked() {
    this.dialog.open(AssignmentCreateDialogComponent, {
      data: {
        courseId: this.courseId,
      },
    });
  }
}
