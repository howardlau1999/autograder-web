import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { InspectionTableDataSource, InspectionTableItem } from './inspection-table-datasource';
import { SubmissionService } from '../../../service/submission.service';

@Component({
  selector: 'app-inspection-table',
  templateUrl: './inspection-table.component.html',
  styleUrls: ['./inspection-table.component.css'],
})
export class InspectionTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<InspectionTableItem>;

  @Output() userChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() set assignmentId(value: number | null) {
    if (value) {
      this.assignmentId$.next(value);
    }
  }

  dataSource: InspectionTableDataSource;

  displayedColumns = ['userId', 'username', 'submissionCount'];

  inspections$: Observable<InspectionTableItem[]>;

  assignmentId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @Input() selectedUserId: number | undefined | null = null;

  constructor(private submissionService: SubmissionService) {
    this.inspections$ = this.assignmentId$.pipe(
      switchMap((assignmentId) => {
        return this.submissionService.inspectAllSubmissionsInAssignment(assignmentId);
      }),
      map((resp) => {
        return resp.getEntriesList();
      }),
      catchError(() => {
        return of([]);
      }),
    );
    this.dataSource = new InspectionTableDataSource(this.inspections$);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onRowClicked(userId: number) {
    this.userChange.emit(userId);
  }
}
