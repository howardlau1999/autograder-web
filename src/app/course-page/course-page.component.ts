import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, of, switchMap} from "rxjs";

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  courseId$: Observable<number>;

  constructor(private route: ActivatedRoute) {
    this.courseId$ = this.route.paramMap.pipe(
      switchMap(params => of(Number.parseInt(params.get('courseId') || '0')),
      ));
  }

  ngOnInit() {
  }


}
