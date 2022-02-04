import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {CoursePageDataSource, CoursePageItem} from './course-page-datasource';
import {ApiService} from "../api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {mergeMap, Observable, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";
import {Course} from "../api/proto/model_pb";

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CoursePageItem>;
  dataSource: CoursePageDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'submitted', 'release_date', 'due_date'];
  course$: Observable<Course | undefined>;
  courseId: number = 0;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    const id$ = this.route.paramMap.pipe(
      map(params => Number.parseInt(params.get('courseId') || "0")), tap(courseId => {
        this.courseId = courseId;
      }))
    this.dataSource = new CoursePageDataSource(apiService, id$);
    this.course$ = id$.pipe(switchMap(courseId => this.apiService.getCourse(courseId)), map(resp => resp.getCourse()));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  gotoAssignment(assignmentId: number) {
    this.router.navigate(["assignments", assignmentId], {relativeTo: this.route}).then();
  }
}
