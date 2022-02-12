import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../api/proto/model_pb';
import { ApiService } from '../../api/api.service';
import { AssignmentsPageDatasource, CoursePageItem } from './assignments-page-datasource';
import { AssignmentCreateDialogComponent } from '../assignment-create-dialog/assignment-create-dialog.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<CoursePageItem>;

  dataSource: AssignmentsPageDatasource;

  displayedColumns = ['id', 'name', 'submitted', 'releaseDate', 'dueDate', 'operations'];

  course$: Observable<Course | undefined>;

  courseId: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    const id$ = this.route.parent!.paramMap.pipe(
      map((params) => Number.parseInt(params.get('courseId') || '0')),
      tap((courseId) => {
        this.courseId = courseId;
      }),
    );
    this.dataSource = new AssignmentsPageDatasource(apiService, id$);
    this.course$ = id$.pipe(
      switchMap((courseId) => this.apiService.getCourse(courseId)),
      map((resp) => resp?.getCourse()),
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  gotoAssignment(assignmentId: number) {
    this.router.navigate([assignmentId], { relativeTo: this.route }).then();
  }

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

  onEditAssignmentClicked(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onEditCourseClicked() {}
}
