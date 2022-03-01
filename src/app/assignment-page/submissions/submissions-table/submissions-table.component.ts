import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  mergeMap,
  mergeWith,
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

  regradeSubmissionSubscription?: Subscription;

  cancelSubmissionSubscription?: Subscription;

  @Output() submissionChange = new EventEmitter<number>();

  @Input() showRegrade?: boolean;

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

  internalSubmissionRefresher$: Subject<null> = new Subject<null>();

  constructor(
    private notificationService: NotificationService,
    private assignmentService: AssignmentService,
    private submissionService: SubmissionService,
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
          repeatWhen(() =>
            this.submissionsRefresher$.pipe(mergeWith(this.internalSubmissionRefresher$)),
          ),
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
    this.regradeSubmissionSubscription?.unsubscribe();
  }

  cancelSubmission(event: MouseEvent, submissionId: number): void {
    event.stopPropagation();
    event.preventDefault();
    this.cancelSubmissionSubscription?.unsubscribe();
    this.cancelSubmissionSubscription = this.submissionService
      .cancelSubmission(submissionId)
      .subscribe(() => {
        this.internalSubmissionRefresher$.next(null);
        this.notificationService.showSnackBar('提交取消成功');
      });
  }

  regradeSubmission(event: MouseEvent, submissionId: number): void {
    event.stopPropagation();
    event.preventDefault();
    this.regradeSubmissionSubscription?.unsubscribe();
    this.regradeSubmissionSubscription = this.submissionService
      .regradeSubmission(submissionId)
      .subscribe(() => {
        this.internalSubmissionRefresher$.next(null);
        this.notificationService.showSnackBar('提交重评成功');
      });
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

  isSubmissionQueued(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.QUEUED;
  }

  isSubmissionRunning(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.RUNNING;
  }

  isSubmissionFinished(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.FINISHED;
  }

  isSubmissionCancelling(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.CANCELLING;
  }

  isSubmissionCancelled(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.CANCELLED;
  }

  isSubmissionInternalError(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.FAILED;
  }

  onRowClicked(submissionId: number) {
    this.submissionChange.emit(submissionId);
  }
}
