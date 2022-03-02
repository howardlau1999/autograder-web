import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Observable, of, Subject, Subscription, switchMap, zipWith } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AssignmentService } from '../../service/assignment.service';
import { NotificationService } from '../../service/notification.service';
import { exportCSV } from '../../common/csv-exporter/csv.exporter';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css'],
})
export class InspectionComponent implements OnInit, OnDestroy {
  assignmentId$: Observable<number>;

  userId$: Observable<undefined | number>;

  submissionsRefresher$: Subject<null> = new Subject<null>();

  regradeAssignmentSubscription?: Subscription;

  exportAssignmentGradesSubscription?: Subscription;

  regradeConfirmSubscription?: Subscription;

  search: string = '';

  search$: Observable<string>;

  searchValueFormControl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentService: AssignmentService,
    private notificationService: NotificationService,
    private matDialog: MatDialog,
  ) {
    this.assignmentId$ = this.route.parent!.paramMap.pipe(
      map((params) => {
        return Number.parseInt(params.get('assignmentId') || '0', 10);
      }),
    );
    this.userId$ = this.route.paramMap.pipe(
      map((params) => {
        const userIdString = params.get('userId');
        if (!userIdString) return undefined;
        return Number.parseInt(userIdString, 10);
      }),
    );
    this.search$ = this.searchValueFormControl.valueChanges.pipe(debounceTime(100));
  }

  ngOnInit(): void {}

  onUserChange(userId: number) {
    const commands: any[] = ['inspection', userId];
    this.router.navigate(commands, { relativeTo: this.route.parent }).then();
  }

  onSubmissionChange(submissionId: number) {
    const commands: any[] = ['submissions', submissionId];
    this.router.navigate(commands, { relativeTo: this.route.parent }).then();
  }

  ngOnDestroy() {
    this.regradeAssignmentSubscription?.unsubscribe();
    this.exportAssignmentGradesSubscription?.unsubscribe();
  }

  exportAssignmentGrades() {
    this.exportAssignmentGradesSubscription?.unsubscribe();
    this.exportAssignmentGradesSubscription = this.assignmentId$
      .pipe(
        switchMap((assignmentId) => {
          return this.assignmentService
            .exportAssignmentGrades(assignmentId)
            .pipe(zipWith(of(assignmentId)));
        }),
      )
      .subscribe(([resp, assignmentId]) => {
        const entries = resp.getEntriesList();
        const fields = [
          'userId',
          'username',
          'nickname',
          'studentId',
          'score',
          'maxScore',
          'submissionCount',
        ];
        const data = entries.map((entry) => [
          entry.getUserId(),
          entry.getUsername(),
          entry.getNickname(),
          entry.getStudentId(),
          entry.getScore(),
          entry.getMaxScore(),
          entry.getSubmissionCount(),
        ]);
        exportCSV(
          { fields, data },
          `grades-${assignmentId}-${DateTime.now().toFormat('yyyy-MM-dd_HH-mm-ss')}`,
        );
      });
  }

  regradeAssignment() {
    this.regradeConfirmSubscription?.unsubscribe();
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: '确认重评所有提交？',
        message: '请注意该操作可能会对评测机带来较大影响',
      },
    });
    this.regradeConfirmSubscription = dialogRef.afterClosed().subscribe((confirmed) => {
      this.regradeConfirmSubscription?.unsubscribe();
      this.regradeConfirmSubscription = undefined;
      if (!confirmed) return;
      this.regradeAssignmentSubscription?.unsubscribe();
      this.regradeAssignmentSubscription = this.assignmentId$
        .pipe(
          switchMap((assignmentId) => {
            return this.assignmentService.regradeAssignment(assignmentId);
          }),
        )
        .subscribe(() => {
          this.notificationService.showSnackBar('提交重评成功');
          this.submissionsRefresher$.next(null);
        });
    });
  }
}
