import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  catchError,
  Observable,
  of,
  retryWhen,
  Subscription,
  switchMap,
  takeLast,
  takeWhile,
  tap,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { Either, match } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { MatDialog } from '@angular/material/dialog';
import { grpc } from '@improbable-eng/grpc-web';
import {
  PendingRank,
  SubmissionReport,
  SubmissionStatus,
  SubmissionStatusMap,
} from '../../../api/proto/model_pb';
import { ApiService } from '../../../api/api.service';
import { SubmissionService } from '../../../service/submission.service';
import { NotificationService } from '../../../service/notification.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../../../common/confirm-dialog/confirm-dialog.component';
import { downloadURL } from '../../../common/downloader/url.downloader';
import { retryExponentialBackoff } from '../../../common/operator/retryExponentialBackoff';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit, OnDestroy {
  report$: Observable<SubmissionReport | undefined> | undefined;

  activate$: Observable<Either<string, boolean>>;

  activateSubscription?: Subscription;

  activateConfirmSubscription?: Subscription;

  error: string | null = null;

  pendingRank?: PendingRank;

  submissionId: number = 0;

  downloadSubscription?: Subscription;

  cancelSubscription?: Subscription;

  cancelConfirmSubscription?: Subscription;

  @ViewChildren('testcase', { read: ElementRef }) renderedTestcases!: QueryList<ElementRef>;

  isSubmissionFailed(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return this.submissionService.isSubmissionFailed(status);
  }

  activateSubmission() {
    this.activateConfirmSubscription?.unsubscribe();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel('确认提交成绩？', '提交后将显示在排行榜中。', true),
    });
    this.activateConfirmSubscription = dialogRef.afterClosed().subscribe((confirmed) => {
      this.activateConfirmSubscription?.unsubscribe();
      if (!confirmed) return;

      this.activateSubscription?.unsubscribe();
      this.activateSubscription = this.activate$.subscribe((result) => {
        pipe(
          result,
          match(
            (error) => {
              this.notificationService.showSnackBar(`提交失败 ${error}`);
            },
            (activated) => {
              if (!activated) {
                this.notificationService.showSnackBar('无法提交');
                return;
              }
              this.notificationService.showSnackBar('提交成功');
            },
          ),
        );
      });
    });
  }

  constructor(
    private apiService: ApiService,
    private submissionService: SubmissionService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {
    this.activate$ = this.route.parent!.parent!.paramMap.pipe(
      switchMap((params) => {
        const submissionId = Number.parseInt(params.get('submissionId') || '0', 10);
        return this.submissionService.activateSubmission(submissionId);
      }),
    );
    this.report$ = this.route.parent?.parent?.paramMap.pipe(
      switchMap((params) => {
        const submissionId = Number.parseInt(params.get('submissionId') || '0', 10);
        this.submissionId = submissionId;
        return this.submissionService.getSubmissionReport(submissionId).pipe(
          retryWhen((errors) => {
            return errors.pipe(
              takeWhile((error) => {
                const { status, message } = error;
                this.error = message;
                return !(
                  message !== 'RUNNING' &&
                  message !== 'QUEUED' &&
                  message !== 'CANCELLING' &&
                  message !== 'CANCELLED' &&
                  status !== grpc.Code.Unknown
                );
              }),
              switchMap(() => {
                return this.submissionService.subscribeSubmission(submissionId).pipe(
                  tap((resp) => {
                    if (resp.getPendingRank()) {
                      this.pendingRank = resp.getPendingRank();
                    }
                    switch (resp.getStatus()) {
                      case SubmissionStatus.RUNNING:
                        this.error = 'RUNNING';
                        break;
                      case SubmissionStatus.CANCELLING:
                        this.error = 'CANCELLING';
                        break;
                      case SubmissionStatus.QUEUED:
                        this.error = 'QUEUED';
                        break;
                      case SubmissionStatus.CANCELLED:
                        this.error = 'CANCELLED';
                        break;
                      default:
                    }
                  }),
                  retryWhen(retryExponentialBackoff()),
                  takeLast(1),
                  switchMap(() => {
                    return this.submissionService.getSubmissionReport(submissionId);
                  }),
                );
              }),
            );
          }),
          map((resp) => {
            return resp.getReport();
          }),
        );
      }),
      catchError((error) => {
        const { message } = error;
        if (message === undefined) throw error;
        this.error = null;
        this.notificationService.showSnackBar(`无法获取报告 ${message}`);
        return of(undefined);
      }),
      retryWhen(retryExponentialBackoff()),
    );
  }

  ngOnInit(): void {}

  onDownloadOutputFileClicked(filename: string) {
    this.downloadSubscription?.unsubscribe();
    this.downloadSubscription = this.submissionService
      .downloadOutputFile(this.submissionId, filename)
      .pipe(
        catchError((error) => {
          const { message } = error;
          this.notificationService.showSnackBar(`无法下载 ${message}`);
          return of(null);
        }),
      )
      .subscribe((resp) => {
        if (!resp) return;
        downloadURL(this.submissionService.getDownloadURL(filename, resp.getToken()), filename);
      });
  }

  onViewVCDClicked(filename: string) {
    this.downloadSubscription?.unsubscribe();
    this.downloadSubscription = this.submissionService
      .downloadOutputFile(this.submissionId, filename)
      .pipe(
        catchError((error) => {
          const { message } = error;
          this.notificationService.showSnackBar(`无法下载 ${message}`);
          return of(null);
        }),
      )
      .subscribe((resp) => {
        if (!resp) return;
        window.open(
          `/vcd-viewer?url=${encodeURIComponent(
            this.submissionService.getDownloadURL(filename, resp.getToken()),
          )}&total=${resp.getFilesize()}`,
          '_blank',
        );
      });
  }

  scrollTo(index: number) {
    this.renderedTestcases.toArray()[index].nativeElement.scrollIntoView();
  }

  ngOnDestroy() {
    this.activateSubscription?.unsubscribe();
    this.activateConfirmSubscription?.unsubscribe();
    this.cancelConfirmSubscription?.unsubscribe();
    this.cancelSubscription?.unsubscribe();
  }

  onCancelClicked() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel('确定取消评测？', '取消后如需重评需联系助教或老师。', false),
    });
    this.cancelConfirmSubscription?.unsubscribe();
    this.cancelConfirmSubscription = dialogRef.afterClosed().subscribe((confirmed) => {
      this.cancelConfirmSubscription?.unsubscribe();
      if (!confirmed) return;
      this.cancelSubscription?.unsubscribe();
      this.cancelSubscription = this.submissionService
        .cancelSubmission(this.submissionId)
        .subscribe(() => {});
    });
  }
}
