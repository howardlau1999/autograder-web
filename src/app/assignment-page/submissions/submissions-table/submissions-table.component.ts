import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  mergeMap,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { map, repeatWhen } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SubmissionService } from '../../../service/submission.service';
import { AssignmentService } from '../../../service/assignment.service';
import { NotificationService } from '../../../service/notification.service';
import { SubmissionsItem, SubmissionsTableDataSource } from './submissions-table-data-source';
import { SubmissionStatus, SubmissionStatusMap } from '../../../api/proto/model_pb';

@Component({
  selector: 'app-submissions-table',
  templateUrl: './submissions-table.component.html',
  styleUrls: ['./submissions-table.component.css'],
})
export class SubmissionsTableComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<SubmissionsItem>;

  assignmentId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  userId_?: number;

  userId$: Subject<number> = new Subject<number>();

  columnsToDisplay = ['submissionId', 'submittedAt', 'score', 'operations'];

  submissions$: Observable<SubmissionsItem[]>;

  dataSource: SubmissionsTableDataSource;

  submissionsLoading: boolean = true;

  downloadSubmissionSubscription?: Subscription;

  @Output() submissionChange = new EventEmitter<number>();

  @Input() set assignmentId(value: number) {
    this.assignmentId$.next(value);
  }

  @Input() set userId(value: number | undefined) {
    this.userId_ = value;
    if (this.table) {
      this.submissionsLoading = true;
      this.dataSource = new SubmissionsTableDataSource(this.submissionService, this.connect());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  }

  @Input() submissionsRefresher$!: Observable<null>;

  constructor(
    private notificationService: NotificationService,
    private assignmentService: AssignmentService,
    private submissionService: SubmissionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.submissions$ = this.connect();
    this.dataSource = new SubmissionsTableDataSource(this.submissionService, this.submissions$);
  }

  connect() {
    return this.assignmentId$.pipe(
      switchMap((assignmentId) =>
        of(assignmentId).pipe(
          tap(() => {
            this.submissionsLoading = true;
          }),
          mergeMap(() => {
            return this.userId_
              ? this.submissionService.inspectUserSubmissionHistory(this.userId_, assignmentId)
              : this.submissionService.getSubmissionsInAssignment(assignmentId);
          }),
          repeatWhen(() => this.submissionsRefresher$),
        ),
      ),
      tap(() => {
        this.submissionsLoading = false;
      }),
      map((resp) => resp.getSubmissionsList()),
      catchError(({ message }) => {
        this.notificationService.showSnackBar(`加载提交记录出错 ${message}`);
        return of([]);
      }),
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    this.downloadSubmissionSubscription?.unsubscribe();
  }

  downloadSubmission(event: MouseEvent, submissionId: number): void {
    event.stopPropagation();
    event.preventDefault();
    this.downloadSubmissionSubscription?.unsubscribe();
    this.downloadSubmissionSubscription = this.submissionService
      .downloadSubmission(submissionId)
      .subscribe((resp) => {
        window.open(
          this.submissionService.getDownloadURL(resp.getFilename(), resp.getToken()),
          '_blank',
        );
      });
  }

  isSubmissionRunning(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.RUNNING;
  }

  isSubmissionFinished(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.FINISHED;
  }

  isSubmissionInternalError(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.FAILED;
  }

  onRowClicked(submissionId: number) {
    this.submissionChange.emit(submissionId);
  }
}
