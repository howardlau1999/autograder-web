import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsPageDatasource, CoursePageItem } from '../assignments-page-datasource';
import { CourseService } from '../../../service/course.service';

@Component({
  selector: 'app-assignments-table',
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.css'],
})
export class AssignmentsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<CoursePageItem>;

  @Input() courseId!: Observable<number>;

  @Input() canWriteCourse: boolean = false;

  dataSource?: AssignmentsPageDatasource;

  displayedColumns = ['id', 'name', 'submitted', 'releaseDate', 'dueDate'];

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.dataSource = new AssignmentsPageDatasource(this.courseService, this.courseId);
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
