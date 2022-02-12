import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
})
export class CoursePageComponent implements OnInit {
  courseId$: Observable<number>;

  canWriteCourse$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.courseId$ = this.route.paramMap.pipe(
      map((params) => Number.parseInt(params.get('courseId') || '0', 10)),
    );
    this.canWriteCourse$ = this.courseId$.pipe(
      switchMap((courseId) => this.courseService.canWriteCourse(courseId)),
      map((resp) => resp.getWritePermission()),
      catchError(() => of(false)),
    );
  }

  ngOnInit() {}
}
