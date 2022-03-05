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
  timer,
} from 'rxjs';
import { map, repeatWhen } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { SubmissionService } from '../../../service/submission.service';
import { AssignmentService } from '../../../service/assignment.service';
import { NotificationService } from '../../../service/notification.service';
import { SubmissionsItem, SubmissionsTableDataSource } from './submissions-table-data-source';
import {
  SubmissionLimitConfig,
  SubmissionStatus,
  SubmissionStatusMap,
} from '../../../api/proto/model_pb';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { downloadURL } from '../../../common/downloader/blob.downloader';

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

  cancelConfirmSubscription?: Subscription;

  @Output() submissionChange = new EventEmitter<number>();

  @Output() submitClick = new EventEmitter<boolean>();

  @Input() showRegrade?: boolean;

  @Input() showSubmit: boolean = false;

  @Input() submissionLimit?: SubmissionLimitConfig;

  @Input() canSubmit: boolean = false;

  limitReached: boolean = false;

  frequencyReached: boolean = false;

  frequencySubscription?: Subscription;

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
    private matDialog: MatDialog,
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
      tap((submissions) => {
        if (this.submissionLimit === undefined) return;
        this.limitReached =
          this.submissionLimit.getTotal() > 0 &&
          submissions.length >= this.submissionLimit.getTotal();
        if (this.submissionLimit.getPeriod() > 0 && this.submissionLimit.getFrequency() > 0) {
          const windowSubmissions = submissions.filter((submission) => {
            const diffMinutes = DateTime.now().diff(
              DateTime.fromJSDate(submission.getSubmittedAt()?.toDate() || new Date()),
              'minutes',
            ).minutes;
            return diffMinutes <= this.submissionLimit!.getPeriod();
          });
          const windowCount = windowSubmissions.length;
          this.frequencyReached = windowCount >= this.submissionLimit.getFrequency();
          if (this.frequencyReached) {
            const oldestDiffMilliseconds = windowSubmissions.reduce((milliseconds, submission) => {
              const diffMilliseconds = DateTime.now().diff(
                DateTime.fromJSDate(submission.getSubmittedAt()?.toDate() || new Date()),
                'milliseconds',
              ).milliseconds;
              return milliseconds > diffMilliseconds ? milliseconds : diffMilliseconds;
            }, 0);
            this.frequencySubscription?.unsubscribe();
            this.frequencySubscription = timer(
              this.submissionLimit.getPeriod() * 60 * 1000 - oldestDiffMilliseconds,
            ).subscribe(() => {
              this.frequencyReached = false;
            });
          }
        }
      }),
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
    this.cancelConfirmSubscription?.unsubscribe();
    this.cancelSubmissionSubscription?.unsubscribe();
    this.frequencySubscription?.unsubscribe();
  }

  cancelSubmission(event: MouseEvent, submissionId: number): void {
    event.stopPropagation();
    event.preventDefault();
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: '确认停止评测？',
        message: '停止后如需重评要联系助教或老师。',
      },
    });
    this.cancelConfirmSubscription?.unsubscribe();
    this.cancelConfirmSubscription = dialogRef.afterClosed().subscribe((confirmed) => {
      this.cancelConfirmSubscription?.unsubscribe();
      this.cancelConfirmSubscription = undefined;
      if (!confirmed) return;
      this.cancelSubmissionSubscription?.unsubscribe();
      this.cancelSubmissionSubscription = this.submissionService
        .cancelSubmission(submissionId)
        .pipe(
          catchError(() => {
            this.internalSubmissionRefresher$.next(null);
            return of(null);
          }),
        )
        .subscribe(() => {
          this.internalSubmissionRefresher$.next(null);
          this.notificationService.showSnackBar('提交取消成功');
        });
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
        downloadURL(
          this.submissionService.getDownloadURL(resp.getFilename(), resp.getToken()),
          resp.getFilename(),
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

  onSubmitClicked() {
    this.submitClick.next(true);
  }
}
