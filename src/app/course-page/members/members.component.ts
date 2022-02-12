import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { repeatWhen, retryWhen, switchMap } from 'rxjs/operators';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { MembersDataSource, MembersItem } from './members-datasource';
import { BatchAddMemberDialogComponent } from './batch-add-member-dialog/batch-add-member-dialog.component';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { ApiService } from '../../api/api.service';
import { RemoveMemberDialogComponent } from './remove-member-dialog/remove-member-dialog.component';
import { UserService } from '../../service/user.service';
import { CourseRoleMap } from '../../api/proto/model_pb';
import { CourseService } from '../../service/course.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<MembersItem>;

  dataSource: MembersDataSource;

  search: string = '';

  courseId: number = 0;

  userId: number | null = 0;

  refresher$: Subject<null> = new Subject<null>();

  members$: Observable<MembersItem[]>;

  addMemberSub: Subscription | undefined;

  removeMemberSub: Subscription | undefined;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['userId', 'username', 'nickname', 'email', 'role', 'operations'];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private courseService: CourseService,
    private apiService: ApiService,
    private notificationService: NotificationService,
  ) {
    this.userId = this.userService.userId;
    this.members$ = this.route.parent!.paramMap.pipe(
      switchMap((params) => {
        this.courseId = Number.parseInt(params.get('courseId') || '0', 10);
        return this.courseService
          .getCourseMembers(this.courseId)
          .pipe(repeatWhen(() => this.refresher$));
      }),
      map((resp) => {
        return resp.getMembersList();
      }),
      catchError(({ message }) => {
        this.notificationService.showSnackBar(`加载成员列表出错 ${message}`);
        return of([]);
      }),
    );
    this.dataSource = new MembersDataSource(this.members$);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onBatchAddMemberClicked() {
    this.dialog.open(BatchAddMemberDialogComponent);
  }

  onAddMemberClicked() {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      data: { courseId: this.courseId },
    });
    if (this.addMemberSub === undefined) {
      dialogRef.afterClosed().subscribe((success) => {
        if (success) {
          this.refresher$.next(null);
        }
        this.addMemberSub?.unsubscribe();
      });
    }
  }

  onMemberRoleChanged(userId: number, role: keyof CourseRoleMap) {
    this.courseService
      .updateCourseMember(this.courseId, userId, role)
      .pipe(
        catchError(() => {
          this.notificationService.showSnackBar('成员权限更新失败');
          return of(null);
        }),
      )
      .subscribe(() => {
        this.notificationService.showSnackBar('成员权限更新成功');
      });
  }

  onDeleteMemberClicked(member: MembersItem) {
    const dialogRef = this.dialog.open(RemoveMemberDialogComponent, {
      data: {
        nickname: member.getNickname(),
        email: member.getEmail(),
      },
    });
    if (this.removeMemberSub === undefined) {
      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.courseService.removeCourseMembers(this.courseId, [member.getUserId()]).subscribe({
            next: () => {
              this.notificationService.showSnackBar('移除成员成功');
              this.refresher$.next(null);
            },
            error: ({ message }) => {
              this.notificationService.showSnackBar(`移除成员失败 ${message}`);
            },
          });
        }
        this.removeMemberSub?.unsubscribe();
      });
    }
  }
}
