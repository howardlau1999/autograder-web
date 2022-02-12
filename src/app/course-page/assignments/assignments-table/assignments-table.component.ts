import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { catchError, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { AssignmentsPageDatasource, AssignmentsTableItem } from '../assignments-page-datasource';
import { CourseService } from '../../../service/course.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-assignments-table',
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.css'],
})
export class AssignmentsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<AssignmentsTableItem>;

  @Input() courseId!: Observable<number>;

  @Input() canWriteCourse: boolean = false;

  loading: boolean = true;

  assignments$: Observable<AssignmentsTableItem[]>;

  dataSource?: AssignmentsPageDatasource;

  displayedColumns = ['id', 'name', 'submitted', 'releaseDate', 'dueDate'];

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {
    this.assignments$ = of([]);
  }

  ngOnInit(): void {
    this.assignments$ = this.courseId.pipe(
      tap(() => {
        this.loading = true;
      }),
      switchMap((courseId) => this.courseService.getAssignmentsInCourse(courseId)),
      map((resp) => {
        this.loading = false;
        return resp.getAssignmentsList();
      }),
      catchError(({ message }) => {
        this.loading = false;
        this.notificationService.showSnackBar(`加载作业列表出错 ${message}`);
        return of([]);
      }),
    );
    this.dataSource = new AssignmentsPageDatasource(this.assignments$);
    if (this.canWriteCourse) {
      this.displayedColumns = [...this.displayedColumns, 'operations'];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource!.sort = this.sort;
    this.dataSource!.paginator = this.paginator;
    this.table.dataSource = this.dataSource!;
  }

  gotoAssignment(assignmentId: number) {
    this.router.navigate([assignmentId], { relativeTo: this.route }).then();
  }

  onEditAssignmentClicked(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
