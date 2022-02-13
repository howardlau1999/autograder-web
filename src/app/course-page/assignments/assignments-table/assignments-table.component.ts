import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { catchError, mergeMap, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, repeatWhen, switchMap, tap } from 'rxjs/operators';
import { AssignmentsTableDatasource, AssignmentsTableItem } from './assignments-table-datasource';
import { NotificationService } from '../../../service/notification.service';
import { AssignmentService } from '../../../service/assignment.service';

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

  dataSource?: AssignmentsTableDatasource;

  displayedColumns = ['id', 'name', 'submitted', 'releaseDate', 'dueDate'];

  @Input() refresher$!: Observable<null>;

  constructor(
    private assignmentService: AssignmentService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {
    this.assignments$ = of([]);
  }

  ngOnInit(): void {
    this.assignments$ = this.courseId.pipe(
      switchMap((courseId) =>
        of(courseId).pipe(
          tap(() => {
            this.loading = true;
          }),
          mergeMap(() => this.assignmentService.getAssignmentsInCourse(courseId)),
          repeatWhen(() => this.refresher$),
        ),
      ),
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
    this.dataSource = new AssignmentsTableDatasource(this.assignments$);
    if (this.canWriteCourse) {
      this.displayedColumns = [...this.displayedColumns];
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
