import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { catchError, mergeMap, Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, repeatWhen } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import {
  Assignment,
  CourseRole,
  SubmissionStatus,
  SubmissionStatusMap,
} from '../../api/proto/model_pb';
import { SubmissionsItem, SubmissionsTableDataSource } from './submissions-table-data-source';
import { SubmissionService } from '../../service/submission.service';
import { AssignmentService } from '../../service/assignment.service';
import { AssignmentEditDialogComponent } from './assignment-edit-dialog/assignment-edit-dialog.component';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubmissionsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<SubmissionsItem>;

  dataSource: SubmissionsTableDataSource;

  columnsToDisplay = ['submissionId', 'submittedAt', 'score', 'operations'];

  assignmentId: number = 0;

  expandedSubmission: SubmissionsItem | null = null;

  uploadDialogSubscription: Subscription | null = null;

  loading: boolean = true;

  refresher$: Subject<null> = new Subject<null>();

  assignment$: Observable<Assignment | undefined>;

  assignmentId$: Observable<number>;

  submissions$: Observable<SubmissionsItem[]>;

  canWriteCourse: boolean = false;

  submissionsLoading: boolean = true;

  submissionsRefresher$: Subject<null> = new Subject<null>();

  isSubmissionRunning(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.RUNNING;
  }

  isSubmissionFinished(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.FINISHED;
  }

  isSubmissionInternalError(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.FAILED;
  }

  constructor(
    private notificationService: NotificationService,
    private assignmentService: AssignmentService,
    private submissionService: SubmissionService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.assignmentId$ = this.route.parent!.paramMap.pipe(
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
        this.canWriteCourse =
          resp.getRole() === CourseRole.INSTRUCTOR || resp.getRole() === CourseRole.TA;
      }),
      map((resp) => resp.getAssignment()),
    );
    this.submissions$ = this.assignmentId$.pipe(
      switchMap((assignmentId) =>
        of(assignmentId).pipe(
          tap(() => {
            this.submissionsLoading = true;
          }),
          mergeMap(() => {
            return this.submissionService.getSubmissionsInAssignment(assignmentId);
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
    this.dataSource = new SubmissionsTableDataSource(this.submissionService, this.submissions$);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  viewSubmissionReport(submissionId: number): void {
    this.router.navigate([submissionId], { relativeTo: this.route }).then();
  }

  openSubmissionDialog(): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      data: {
        assignmentId: this.assignmentId,
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

  onEditAssignmentClicked(assignment: Assignment) {
    const dialogRef = this.dialog.open(AssignmentEditDialogComponent, {
      data: {
        assignmentId: this.assignmentId,
        assignment,
      },
    });
    if (this.editAssignmentSubscription === undefined) {
      this.editAssignmentSubscription = dialogRef.afterClosed().subscribe((success) => {
        this.editAssignmentSubscription?.unsubscribe();
        this.editAssignmentSubscription = undefined;

        if (success) {
          this.refresher$.next(null);
          this.notificationService.showSnackBar('编辑作业成功');
          return;
        }
        this.notificationService.showSnackBar('取消编辑');
      });
    }
  }

  ngOnInit(): void {}
}
