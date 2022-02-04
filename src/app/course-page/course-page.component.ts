import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {CoursePageDataSource, CoursePageItem} from './course-page-datasource';
import {ApiService} from "../api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {mergeMap} from "rxjs";
import {map} from "rxjs/operators";

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

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.dataSource = new CoursePageDataSource(apiService, this.route.paramMap.pipe(
      map(params => Number.parseInt(params.get('courseId') || "0")))
    );
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
