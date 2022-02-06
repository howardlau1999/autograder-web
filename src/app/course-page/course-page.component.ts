import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {CoursePageDataSource, CoursePageItem} from './course-page-datasource';
import {ApiService} from "../api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {mergeMap, Observable, of, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";
import {Course} from "../api/proto/model_pb";

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
