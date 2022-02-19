import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AssignmentService } from '../service/assignment.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-assignment-page',
  templateUrl: './assignment-page.component.html',
  styleUrls: ['./assignment-page.component.css'],
})
export class AssignmentPageComponent implements OnInit {
  assignmentId$: Observable<number>;

  hasLeaderboard$: Observable<boolean>;

  canWriteCourse$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private assignmentService: AssignmentService,
  ) {
    this.canWriteCourse$ = this.route.paramMap.pipe(
      map((params) => {
        return Number.parseInt(params.get('courseId') || '0', 10);
      }),
      switchMap((courseId) => {
        return this.courseService.canWriteCourse(courseId);
      }),
      map((resp) => {
        return resp.getWritePermission();
      }),
    );

    this.assignmentId$ = this.route.paramMap.pipe(
      map((params) => Number.parseInt(params.get('assignmentId') || '0', 10)),
    );
    this.hasLeaderboard$ = this.assignmentId$.pipe(
      switchMap((assignmentId) => this.assignmentService.hasLeaderboard(assignmentId)),
      map((resp) => resp.getHasLeaderboard()),
    );
  }

  ngOnInit(): void {}
}
