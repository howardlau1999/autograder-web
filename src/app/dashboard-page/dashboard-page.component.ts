import { Component } from '@angular/core';
import { repeatWhen, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of, Subject, Subscription } from 'rxjs';
import { CourseJoinDialogComponent } from './course-join-dialog/course-join-dialog.component';
import { CourseCreateDialogComponent } from './course-create-dialog/course-create-dialog.component';
import { DashboardService } from '../service/dashboard.service';
import { NotificationService } from '../service/notification.service';
import { GetCourseListResponse } from '../api/proto/api_pb';
import { CourseRole, CourseRoleMap } from '../api/proto/model_pb';
import { UserService } from '../service/user.service';
import CourseCardInfo = GetCourseListResponse.CourseCardInfo;

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  refresher$: Subject<null> = new Subject<null>();

  loading: boolean = true;

  cards$: Observable<CourseCardInfo[]> = this.route.paramMap.pipe(
    switchMap(() => this.dashboardService.getCourseList().pipe(repeatWhen(() => this.refresher$))),
    tap(() => {
      this.loading = false;
    }),
    catchError(({ message }) => {
      this.loading = false;
      this.notificationService.showSnackBar(`获取课程列表失败 ${message}`);
      return of([]);
    }),
  );

  createDialogSubscription?: Subscription;

  joinDialogSubscription?: Subscription;

  showCreateCourse = false;

  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private userService: UserService,
  ) {
    this.showCreateCourse = userService.isAdmin;
  }

  joinCourse() {
    const dialogRef = this.dialog.open(CourseJoinDialogComponent);
    if (this.joinDialogSubscription === undefined) {
      this.joinDialogSubscription = dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.refresher$.next(null);
        }
      });
    }
  }

  ngOnDestroy() {
    this.createDialogSubscription?.unsubscribe();
    this.joinDialogSubscription?.unsubscribe();
  }

  canEditCourse(role: CourseRoleMap[keyof CourseRoleMap]) {
    return role === CourseRole.INSTRUCTOR;
  }

  createCourse() {
    const dialogRef = this.dialog.open(CourseCreateDialogComponent);
    if (this.createDialogSubscription === undefined) {
      this.createDialogSubscription = dialogRef.afterClosed().subscribe((result) => {
        if (result !== null) {
          this.refresher$.next(null);
          this.notificationService.showSnackBar('课程创建成功');
        } else {
          this.notificationService.showSnackBar('创建取消');
        }
      });
    }
  }
}
