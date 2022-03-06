import { Component, OnDestroy, OnInit } from '@angular/core';
import { mergeMap, Observable, of, Subject, Subscription, switchMap, tap, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, repeatWhen } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { KatexOptions } from 'ngx-markdown-latex';
import { UploadDialogComponent } from '../../../common/submissions-table/upload-dialog/upload-dialog.component';
import { Assignment, CourseRole, SubmissionLimitConfig } from '../../../api/proto/model_pb';
import { SubmissionsItem } from '../../../common/submissions-table/submissions-table-data-source';
import { SubmissionService } from '../../../service/submission.service';
import { AssignmentService } from '../../../service/assignment.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css'],
})
export class SubmissionsComponent implements OnInit, OnDestroy {
  assignmentId: number = 0;

  expandedSubmission: SubmissionsItem | null = null;

  uploadDialogSubscription: Subscription | null = null;

  loading: boolean = true;

  refresher$: Subject<null> = new Subject<null>();

  assignment$: Observable<Assignment | undefined>;

  assignmentId$: Observable<number>;

  canWriteCourse: boolean = false;

  canSubmit: boolean = false;

  submissionsRefresher$: Subject<null> = new Subject<null>();

  releaseTimerSubscription?: Subscription;

  dueTimerSubscription?: Subscription;

  changeAnonymousSubscription?: Subscription;

  anonymous = false;

  editMode = false;

  submissionLimit?: SubmissionLimitConfig;

  uploadLimit: number = 0;

  constructor(
    private notificationService: NotificationService,
    private assignmentService: AssignmentService,
    private submissionService: SubmissionService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.assignmentId$ = this.route.parent!.parent!.paramMap.pipe(
      map((params) => Number.parseInt(params.get('assignmentId') || '0', 10)),
      tap((assignmentId) => {
        this.assignmentId = assignmentId;
      }),
    );
    this.assignment$ = this.assignmentId$.pipe(
      switchMap((assignmentId) =>
        of(assignmentId).pipe(
          tap(() => {
            this.loading = true;
          }),
          mergeMap(() => this.assignmentService.getAssignment(assignmentId)),
          repeatWhen(() => this.refresher$),
        ),
      ),
      tap((resp) => {
        this.loading = false;
        this.anonymous = resp.getAnonymous();
        this.canWriteCourse =
          resp.getRole() === CourseRole.INSTRUCTOR || resp.getRole() === CourseRole.TA;
      }),
      map((resp) => resp.getAssignment()),
      tap((assignment) => {
        this.submissionLimit = assignment?.getSubmissionLimit();
        this.uploadLimit = assignment?.getUploadLimit() || 0;
        if (this.canWriteCourse) {
          this.canSubmit = true;
          this.submissionLimit = undefined;
        } else {
          this.releaseTimerSubscription?.unsubscribe();
          this.dueTimerSubscription?.unsubscribe();
          this.canSubmit = false;
          const receiveTs = new Date();
          const releaseDate = assignment?.getReleaseDate()?.toDate() || new Date();
          const dueDate = assignment?.getDueDate()?.toDate() || new Date();
          if (receiveTs > releaseDate) {
            this.canSubmit = true;
          } else {
            this.releaseTimerSubscription = timer(releaseDate).subscribe(() => {
              this.canSubmit = true;
            });
          }

          if (receiveTs > dueDate) {
            this.canSubmit = false;
          } else {
            this.dueTimerSubscription = timer(dueDate).subscribe(() => {
              this.canSubmit = false;
            });
          }
        }
      }),
    );
  }

  openSubmissionDialog(): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      data: {
        assignmentId: this.assignmentId,
        uploadLimit: this.uploadLimit,
      },
    });
    if (this.uploadDialogSubscription === null) {
      this.uploadDialogSubscription = dialogRef.afterClosed().subscribe((result) => {
        this.uploadDialogSubscription?.unsubscribe();
        this.uploadDialogSubscription = null;

        if (result) {
          this.submissionsRefresher$.next(null);
          this.notificationService.showSnackBar('提交成功');
        } else {
          this.notificationService.showSnackBar('提交取消');
        }
      });
    }
  }

  editAssignmentSubscription?: Subscription;

  onEditAssignmentClicked() {
    this.editMode = true;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.dueTimerSubscription?.unsubscribe();
    this.releaseTimerSubscription?.unsubscribe();
    this.editAssignmentSubscription?.unsubscribe();
    this.changeAnonymousSubscription?.unsubscribe();
  }

  onAssignmentEditConfirmed() {
    this.editMode = false;
    this.refresher$.next(null);
  }

  onAssignmentEditCancelled() {
    this.editMode = false;
  }

  onSubmissionChanged(submissionId: number) {
    this.router.navigate([submissionId], { relativeTo: this.route }).then();
  }

  onAnonymousChanged(event: MatSlideToggleChange) {
    this.changeAnonymousSubscription?.unsubscribe();
    this.changeAnonymousSubscription = this.assignmentService
      .changeLeaderboardAnonymous(this.assignmentId, event.checked)
      .subscribe(() => {
        this.notificationService.showSnackBar(event.checked ? '已启用匿名排行' : '已禁用匿名排行');
        this.refresher$.next(null);
      });
  }

  options: KatexOptions = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
    ],
    throwOnError: false,
    errorColor: '#cc0000',
  };
}
