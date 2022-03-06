import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, last, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Either, match } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import {
  PendingRank,
  SubmissionReport,
  SubmissionStatus,
  SubmissionStatusMap,
} from '../../../api/proto/model_pb';
import { ApiService } from '../../../api/api.service';
import { SubmissionService } from '../../../service/submission.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  report$: Observable<SubmissionReport | undefined> | undefined;

  activate$: Observable<Either<string, boolean>>;

  activateSubscription?: Subscription;

  error: string | null = null;

  pendingRank?: PendingRank;

  submissionId: number = 0;

  downloadSubscription?: Subscription;

  @ViewChildren('testcase', { read: ElementRef }) renderedTestcases!: QueryList<ElementRef>;

  isSubmissionFailed(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.FAILED;
  }

  activateSubmission() {
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
  }

  constructor(
    private apiService: ApiService,
    private submissionService: SubmissionService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
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
          catchError((error) => {
            const { message } = error;
            this.error = message;
            if (message !== 'RUNNING' && message !== 'QUEUED' && message !== 'CANCELLING')
              throw error;

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
                  default:
                }
              }),
              last((resp) => {
                return (
                  resp.getStatus() === SubmissionStatus.FINISHED ||
                  resp.getStatus() === SubmissionStatus.CANCELLED ||
                  resp.getStatus() === SubmissionStatus.FAILED
                );
              }),
              switchMap(() => {
                return this.submissionService.getSubmissionReport(submissionId);
              }),
            );
          }),
          map((resp) => {
            return resp.getReport();
          }),
        );
      }),
      catchError(({ message }) => {
        this.error = null;
        this.notificationService.showSnackBar(`无法获取报告 ${message}`);
        return of(undefined);
      }),
    );
  }

  ngOnInit(): void {}

  onDownloadOutputFileClicked(filename: string) {
    this.downloadSubscription?.unsubscribe();
    this.downloadSubscription = this.submissionService
      .downloadOutputFile(this.submissionId, filename)
      .subscribe({
        next: (resp) => {
          window.open(this.submissionService.getDownloadURL(filename, resp.getToken()), '_blank');
        },

        error: ({ message }) => {
          this.notificationService.showSnackBar(`无法下载 ${message}`);
        },
      });
  }

  onViewVCDClicked(filename: string) {
    this.downloadSubscription?.unsubscribe();
    this.downloadSubscription = this.submissionService
      .downloadOutputFile(this.submissionId, filename)
      .subscribe({
        next: (resp) => {
          window.open(
            `/vcd?url=${encodeURIComponent(
              this.submissionService.getDownloadURL(filename, resp.getToken()),
            )}&total=${resp.getFilesize()}`,
            '_blank',
          );
        },
        error: ({ message }) => {
          this.notificationService.showSnackBar(`无法下载 ${message}`);
        },
      });
  }

  scrollTo(index: number) {
    this.renderedTestcases.toArray()[index].nativeElement.scrollIntoView();
  }
}
