import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, repeatWhen } from 'rxjs/operators';
import { Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Course, CourseRole } from '../../api/proto/model_pb';
import { AssignmentCreateDialogComponent } from './assignment-create-dialog/assignment-create-dialog.component';
import { CourseService } from '../../service/course.service';
import { CourseEditDialogComponent } from './course-edit-dialog/course-edit-dialog.component';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit, OnDestroy {
  course$: Observable<Course | undefined>;

  courseId$: Observable<number>;

  courseId: number = 0;

  canWriteCourse: boolean;

  editCourseSubscription?: Subscription;

  addAssignmentSubscription?: Subscription;

  refresher$: Subject<null> = new Subject<null>();

  tableRefresher$: Subject<null> = new Subject();

  allowsJoinSubscription?: Subscription;

  generateJoinCodeSubscription?: Subscription;

  editMode = false;

  constructor(
    private notificationService: NotificationService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.canWriteCourse = false;
    this.courseId$ = this.route.parent!.paramMap.pipe(
      map((params) => Number.parseInt(params.get('courseId') || '0', 10)),
      tap((courseId) => {
        this.courseId = courseId;
      }),
    );
    this.course$ = this.courseId$.pipe(
      switchMap((courseId) =>
        this.courseService.getCourse(courseId).pipe(repeatWhen(() => this.refresher$)),
      ),
      tap((resp) => {
        this.canWriteCourse = resp.getRole() === CourseRole.INSTRUCTOR;
      }),
      map((resp) => resp.getCourse()),
    );
  }

  ngOnInit() {}

  gotoAdmin() {
    this.router.navigate(['admin'], { relativeTo: this.route }).then();
  }

  onEditCourseClicked() {
    this.editMode = true;
  }

  onEditCourseCancelled() {
    this.editMode = false;
  }

  onEditCourseConfirmed() {
    this.editMode = false;
    this.refresher$.next(null);
  }

  onGenerateJoinCodeClicked() {
    this.generateJoinCodeSubscription?.unsubscribe();
    this.generateJoinCodeSubscription = this.courseService
      .generateJoinCode(this.courseId)
      .subscribe(() => {
        this.notificationService.showSnackBar('已生成加课码');
        this.refresher$.next(null);
      });
  }

  ngOnDestroy() {
    this.allowsJoinSubscription?.unsubscribe();
    this.generateJoinCodeSubscription?.unsubscribe();
  }

  onAllowsJoinChanged(event: MatSlideToggleChange) {
    this.allowsJoinSubscription?.unsubscribe();
    this.allowsJoinSubscription = this.courseService
      .changeAllowsJoinCourse(this.courseId, event.checked)
      .subscribe(() => {
        this.notificationService.showSnackBar(event.checked ? '已允许加入' : '已禁止加入');
        this.refresher$.next(null);
      });
  }

  onAddAssignmentClicked() {
    const dialogRef = this.dialog.open(AssignmentCreateDialogComponent, {
      data: {
        courseId: this.courseId,
      },
    });
    if (this.addAssignmentSubscription === undefined) {
      this.addAssignmentSubscription = dialogRef.afterClosed().subscribe((success) => {
        this.addAssignmentSubscription?.unsubscribe();
        this.addAssignmentSubscription = undefined;
        if (success) {
          this.tableRefresher$.next(null);
          this.notificationService.showSnackBar('添加作业成功');
          return;
        }
        this.notificationService.showSnackBar('取消添加');
      });
    }
  }
}
