import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { mergeWith, Observable, Subject, Subscription } from 'rxjs';
import { JoinDialogComponent } from './join-dialog/join-dialog.component';
import { CourseCreateDialogComponent } from './course-create-dialog/course-create-dialog.component';
import { DashboardService } from '../service/dashboard.service';
import { NotificationService } from '../service/notification.service';
import { GetCourseListResponse } from '../api/proto/api_pb';
import { CourseRole } from '../api/proto/model_pb';
import CourseCardInfo = GetCourseListResponse.CourseCardInfo;

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  refresher: Subject<null> = new Subject<null>();

  cards$: Observable<CourseCardInfo[]> = this.route.paramMap.pipe(
    mergeWith(this.refresher),
    switchMap(() => this.dashboardService.getCourseList()),
  );

  createDialogSubscription: Subscription | null = null;

  CourseRole = CourseRole;

  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {}

  joinCourse() {
    this.dialog.open(JoinDialogComponent);
  }

  createCourse() {
    const dialogRef = this.dialog.open(CourseCreateDialogComponent);
    if (this.createDialogSubscription === null) {
      this.createDialogSubscription = dialogRef.afterClosed().subscribe((result) => {
        if (result !== null) {
          this.refresher.next(null);
          this.notificationService.showSnackBar('课程创建成功');
        } else {
          this.notificationService.showSnackBar('创建取消');
        }
      });
    }
  }
}
