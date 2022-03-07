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
  delay,
  mergeMap,
  mergeWith,
  Observable,
  of,
  retryWhen,
  Subject,
  Subscription,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import { map, repeatWhen } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { SubmissionService } from '../../service/submission.service';
import { AssignmentService } from '../../service/assignment.service';
import { NotificationService } from '../../service/notification.service';
import { SubmissionsItem, SubmissionsTableDataSource } from './submissions-table-data-source';
import { SubmissionLimitConfig, SubmissionStatusMap } from '../../api/proto/model_pb';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { downloadURL } from '../downloader/url.downloader';

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

  runningSubmissions: { [id: string]: Subscription } = {};

  @Input() set assignmentId(value: number) {
    this.assignmentId$.next(value);
  }

  @Input() set userId(value: number | undefined) {
    this.userId_ = value;
    if (this.table) {
      this.submissionsLoading = true;
      this.dataSource = new SubmissionsTableDataSource(this.connect());
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
    private dialog: MatDialog,
  ) {
    this.submissions$ = this.connect();
    this.dataSource = new SubmissionsTableDataSource(this.submissions$);
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
            const nowToOldestSubmission = DateTime.now().diff(
              windowSubmissions
                .map((submission) => {
                  return DateTime.fromJSDate(submission.getSubmittedAt()?.toDate() || new Date());
                })
                .sort((a, b) => {
                  const diffMilliseconds = a.diff(b, 'milliseconds').milliseconds;
                  if (diffMilliseconds < 0) return -1;
                  if (diffMilliseconds > 0) return 1;
                  return 0;
                })[windowCount - this.submissionLimit.getFrequency()],
              'milliseconds',
            ).milliseconds;

            this.frequencySubscription?.unsubscribe();
            this.frequencySubscription = timer(
              this.submissionLimit.getPeriod() * 60 * 1000 - nowToOldestSubmission,
            ).subscribe(() => {
              this.frequencyReached = false;
            });
          }
        }
      }),
      tap((data) => {
        Object.keys(this.runningSubmissions).forEach((id) => {
          this.runningSubmissions[id].unsubscribe();
        });
        this.runningSubmissions = {};
        data.forEach((submission) => {
          if (!this.submissionService.isSubmissionPending(submission.getStatus())) return;
          const submissionId = submission.getSubmissionId();
          this.runningSubmissions[submissionId] = this.submissionService
            .subscribeSubmission(submissionId)
            .pipe(
              catchError((error) => {
                const { message } = error;
                if (message === undefined) throw error;
                this.notificationService.showSnackBar(`订阅提交 ${submissionId} 出错 ${message}`);
                return of(undefined);
              }),
              retryWhen((errors) => {
                return errors.pipe(delay(100));
              }),
            )
            .subscribe((resp) => {
              if (!resp || !this.submissionService.isSubmissionPending(resp.getStatus())) {
                this.runningSubmissions[submissionId].unsubscribe();
                delete this.runningSubmissions[submissionId];
              }
              if (!resp) return;
              if (resp.getPendingRank()) {
                submission.setPendingRank(resp.getPendingRank());
              }
              submission.setStatus(resp.getStatus());
              submission.setScore(resp.getScore());
              submission.setMaxScore(resp.getMaxscore());
            });
        });
      }),
      catchError((error) => {
        const { message } = error;
        this.notificationService.showSnackBar(`加载提交记录出错 ${message || error}`);
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
    Object.keys(this.runningSubmissions).forEach((id) => this.runningSubmissions[id].unsubscribe());
    this.downloadSubmissionSubscription?.unsubscribe();
    this.regradeSubmissionSubscription?.unsubscribe();
    this.cancelConfirmSubscription?.unsubscribe();
    this.cancelSubmissionSubscription?.unsubscribe();
    this.frequencySubscription?.unsubscribe();
  }

  cancelSubmission(event: MouseEvent, submissionId: number): void {
    event.stopPropagation();
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
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
          catchError(({ message }) => {
            this.notificationService.showSnackBar(`取消评测出错 ${message}`);
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
    return this.submissionService.isSubmissionQueued(status);
  }

  isSubmissionRunning(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return this.submissionService.isSubmissionRunning(status);
  }

  isSubmissionFinished(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return this.submissionService.isSubmissionFinished(status);
  }

  isSubmissionCancelling(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return this.submissionService.isSubmissionCancelling(status);
  }

  isSubmissionCancelled(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return this.submissionService.isSubmissionCancelled(status);
  }

  isSubmissionInternalError(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return this.submissionService.isSubmissionInternalError(status);
  }

  onRowClicked(submissionId: number) {
    this.submissionChange.emit(submissionId);
  }

  onSubmitClicked() {
    this.submitClick.next(true);
  }
}
