import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {
  catchError,
  debounceTime,
  from,
  mergeMap,
  of,
  scan,
  Subject,
  Subscription,
  takeLast,
} from 'rxjs';
import { map, repeatWhen, switchMap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { HttpClient } from '@angular/common/http';
import * as zip from '@zip.js/zip.js';
import { Value } from 'google-protobuf/google/protobuf/struct_pb';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { LeaderboardDataSource, LeaderboardItem } from './leaderboard-datasource';
import { UserService } from '../../../service/user.service';
import { downloadCSV } from '../../../common/downloader/csv.downloader';
import { SubmissionService } from '../../../service/submission.service';
import { downloadBlob } from '../../../common/downloader/blob.downloader';
import { NotificationService } from '../../../service/notification.service';
import { AssignmentService } from '../../../service/assignment.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../../../common/confirm-dialog/confirm-dialog.component';
import { downloadURL } from '../../../common/downloader/url.downloader';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<LeaderboardItem>;

  dataSource: LeaderboardDataSource;

  displayedColumns = ['rank'];

  columns: string[] = [];

  userColumns: string[] = [];

  exportEnabled: boolean = false;

  refresher$: Subject<null> = new Subject<null>();

  assignmentId: number = 0;

  exportSubmissionSubscription?: Subscription;

  downloadSubmissionSubscription?: Subscription;

  deleteLeaderboardSubscription?: Subscription;

  deleteConfirmSubscription?: Subscription;

  exportingSubmissions = 0;

  exportedSubmissions = 0;

  searchFormControl = new FormControl('');

  searchDisabled = true;

  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new LeaderboardDataSource(
      this.route.parent!.parent!.paramMap.pipe(
        map((params) => {
          this.assignmentId = Number.parseInt(params.get('assignmentId') || '0', 10);
          return this.assignmentId;
        }),
        switchMap((assignmentId) => {
          return assignmentService.getLeaderboard(assignmentId).pipe(
            repeatWhen(() => this.refresher$),
            map((resp) => {
              const sortItems: {
                [k: string]: { isDesc: boolean; order: number };
              } = {};
              let data = (resp?.getEntriesList() || []).map((entry) => {
                return entry
                  .getItemsList()
                  .map((item) => {
                    const obj: LeaderboardItem = {
                      items: {},
                      rank: 0,
                      nickname: entry.getNickname(),
                      username: entry.getUsername(),
                      studentId: entry.getStudentId(),
                      isSelf: entry.getUserId() === this.userService.userId,
                      submittedAt: entry.getSubmittedAt()?.toDate() || new Date(),
                      submissionId: entry.getSubmissionId(),
                      userId: entry.getUserId(),
                    };
                    sortItems[item.getName()] = {
                      isDesc: item.getIsDesc(),
                      order: item.getOrder(),
                    };
                    obj.items[item.getName()] = {
                      value: item.getValue() || new Value(),
                      desc: item.getIsDesc(),
                      order: item.getOrder(),
                      suffix: item.getSuffix(),
                    };
                    return obj;
                  })
                  .reduce((accumulator, current) => {
                    Object.keys(current.items).forEach((k) => {
                      accumulator.items[k] = current.items[k];
                    });
                    return accumulator;
                  });
              });
              if (data.length > 0) {
                const keys = Object.keys(sortItems).sort((a, b) => {
                  const aOrder = sortItems[a].order;
                  const bOrder = sortItems[b].order;
                  if (aOrder > bOrder) return 1;
                  if (aOrder < bOrder) return -1;
                  return 0;
                });
                data = data
                  .sort((a, b) => {
                    for (let i = 0; i < keys.length; i += 1) {
                      const key = keys[i];
                      const isDesc = a.items[key].desc ? -1 : 1;
                      if (a.items[key].value > b.items[key].value) return 1 * isDesc;
                      if (a.items[key].value < b.items[key].value) return -1 * isDesc;
                    }
                    if (a.submittedAt > b.submittedAt) return 1;
                    if (a.submittedAt < b.submittedAt) return -1;
                    return 0;
                  })
                  .map((item, index) => {
                    const rankedItem = item;
                    rankedItem.rank = index + 1;
                    return rankedItem;
                  });
                this.searchDisabled = resp.getAnonymous() && !resp.getFull();
                this.columns = keys;
                this.exportEnabled = resp.getFull();
                this.userColumns = (!resp.getAnonymous() || resp.getFull() ? ['nickname'] : [])
                  .concat(resp.getFull() ? ['username', 'studentId'] : [])
                  .concat(['submittedAt']);
              }
              return data;
            }),
          );
        }),
        catchError((error) => {
          const { message } = error;
          this.notificationService.showSnackBar(`无法加载排行榜 ${message}`);
          return of([]);
        }),
      ),
      this.searchFormControl.valueChanges.pipe(debounceTime(100)),
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    this.exportSubmissionSubscription?.unsubscribe();
    this.downloadSubmissionSubscription?.unsubscribe();
    this.deleteLeaderboardSubscription?.unsubscribe();
    this.deleteConfirmSubscription?.unsubscribe();
  }

  onExportClicked() {
    downloadCSV(
      this.dataSource.exportData(this.columns),
      `leaderboard-${this.assignmentId}-${DateTime.now().toFormat('yyyy-MM-dd_HH-mm-ss')}.csv`,
    );
  }

  onDeleteLeaderboardClicked(userId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(
        '确认删除排行榜记录？',
        '删除后需要学生重新提交排行榜记录',
        false,
      ),
    });
    this.deleteConfirmSubscription?.unsubscribe();
    this.deleteConfirmSubscription = dialogRef.afterClosed().subscribe((confirmed) => {
      this.deleteConfirmSubscription?.unsubscribe();
      if (!confirmed) return;
      this.deleteLeaderboardSubscription?.unsubscribe();
      this.deleteLeaderboardSubscription = this.assignmentService
        .deleteLeaderboard(this.assignmentId, userId)
        .subscribe(() => {
          this.refresher$.next(null);
        });
    });
  }

  onDownloadSubmissionClicked(submissionId: number) {
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

  onCancelExportClicked() {
    this.exportSubmissionSubscription?.unsubscribe();
    this.exportingSubmissions = 0;
    this.exportedSubmissions = 0;
  }

  onExportSubmissionsClicked() {
    const zipWriter = new zip.ZipWriter(new zip.BlobWriter('application/zip'));
    this.exportSubmissionSubscription?.unsubscribe();
    const submissionIds = this.dataSource.getSubmissionIds();
    this.exportingSubmissions = submissionIds.length;
    this.exportSubmissionSubscription = from(submissionIds)
      .pipe(
        mergeMap((submissionId) => {
          return this.submissionService.downloadSubmission(submissionId);
        }, 10),
        mergeMap((resp) => {
          return this.http
            .get(this.submissionService.getDownloadURL(resp.getFilename(), resp.getToken()), {
              responseType: 'blob',
            })
            .pipe(
              mergeMap((submissionZipBlob) => {
                return from(
                  zipWriter.add(resp.getFilename(), new zip.BlobReader(submissionZipBlob)),
                );
              }),
            );
        }, 10),
        scan((completed) => {
          this.exportedSubmissions = completed + 1;
          return this.exportedSubmissions;
        }, 0),
        takeLast(1),
        mergeMap(() => from(zipWriter.close())),
      )
      .subscribe((zipBlob: Blob) => {
        this.notificationService.showSnackBar(
          `已导出 ${this.exportedSubmissions} 份提交，总计 ${this.exportingSubmissions} 份`,
        );
        this.exportedSubmissions = 0;
        this.exportingSubmissions = 0;
        downloadBlob(
          zipBlob,
          `leaderboard_submissions-${this.assignmentId}-${DateTime.now().toFormat(
            'yyyy-MM-dd_HH-mm-ss',
          )}.zip`,
        );
      });
  }
}
