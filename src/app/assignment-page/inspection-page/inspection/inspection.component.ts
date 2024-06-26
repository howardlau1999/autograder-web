import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Observable, of, Subject, Subscription, switchMap, zipWith } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { AssignmentService } from '../../../service/assignment.service';
import { NotificationService } from '../../../service/notification.service';
import { downloadCSV } from '../../../common/downloader/csv.downloader';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../../../common/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../../service/user.service';

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
    private userService: UserService,
    private assignmentService: AssignmentService,
    private notificationService: NotificationService,
    private matDialog: MatDialog,
  ) {
    this.assignmentId$ = this.route.parent!.parent!.paramMap.pipe(
      map((params) => {
        return Number.parseInt(params.get('assignmentId') || '0', 10);
      }),
    );
    this.userId$ = this.route.paramMap.pipe(
      map((params) => {
        const userIdString = params.get('userId');
        if (!userIdString) return this.userService.userId || 0;
        return Number.parseInt(userIdString, 10);
      }),
    );
    this.search$ = this.searchValueFormControl.valueChanges.pipe(debounceTime(100));
  }

  ngOnInit(): void {}

  onUserChange(userId: number) {
    const commands: any[] = ['inspection', userId];
    this.router.navigate(commands, { relativeTo: this.route.parent?.parent }).then();
  }

  onSubmissionChange(submissionId: number) {
    const commands: any[] = ['submissions', submissionId];
    this.router.navigate(commands, { relativeTo: this.route.parent?.parent }).then();
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
        // Collect Leaderboard Items
        const leaderboardNames: string[] = [];
        const leaderboardNameIdx: { [k: string]: number } = {};
        entries.forEach((entry) => {
          const leaderboardList = entry.getLeaderboardList();
          leaderboardList.forEach((item) => {
            const name = item.getName();
            if (leaderboardNameIdx[name] === undefined) {
              leaderboardNameIdx[name] = leaderboardNames.length;
              leaderboardNames.push(name);
            }
          });
        });
        const fields = [
          'userId',
          'username',
          'nickname',
          'studentId',
          'score',
          'maxScore',
          'submissionCount',
          'submissionId',
          'submitAt',
          ...leaderboardNames,
        ];
        const data = entries.map((entry) => {
          const leaderboard = entry.getLeaderboardList();
          const leaderboardValues = Array(leaderboardNames.length).fill('');
          leaderboard.forEach((item) => {
            const name = item.getName();
            const value = item.getValue();
            const idx = leaderboardNameIdx[name];
            if (value !== undefined) {
              leaderboardValues[idx] = value.hasNumberValue()
                ? value.getNumberValue()
                : value.getStringValue();
            }
          });
          return [
            entry.getUserId(),
            entry.getUsername(),
            entry.getNickname(),
            entry.getStudentId(),
            entry.getScore(),
            entry.getMaxScore(),
            entry.getSubmissionCount(),
            entry.getSubmissionId(),
            entry.getSubmitAt()?.toDate().toISOString(),
            ...leaderboardValues,
          ];
        });
        downloadCSV(
          { fields, data },
          `grades-${assignmentId}-${DateTime.now().toFormat('yyyy-MM-dd_HH-mm-ss')}`,
        );
      });
  }

  regradeAssignment() {
    this.regradeConfirmSubscription?.unsubscribe();
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(
        '确认重评所有提交？',
        '请注意该操作可能会对评测机带来较大影响',
        false,
      ),
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
