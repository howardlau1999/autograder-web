import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, repeatWhen } from 'rxjs/operators';
import { Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
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
export class AssignmentsComponent implements OnInit {
  course$: Observable<Course | undefined>;

  courseId$: Observable<number>;

  courseId: number = 0;

  canWriteCourse: boolean;

  editCourseSubscription?: Subscription;

  addAssignmentSubscription?: Subscription;

  refresher$: Subject<null> = new Subject<null>();

  tableRefresher$: Subject<null> = new Subject();

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

  onEditCourseClicked(course: Course) {
    const dialogRef = this.dialog.open(CourseEditDialogComponent, {
      data: {
        courseId: this.courseId,
        name: course.getName(),
        shortName: course.getShortName(),
        description: course.getDescription(),
      },
    });
    if (this.editCourseSubscription === undefined) {
      this.editCourseSubscription = dialogRef.afterClosed().subscribe((success) => {
        this.editCourseSubscription?.unsubscribe();
        this.editCourseSubscription = undefined;
        if (success) {
          this.refresher$.next(null);
          this.notificationService.showSnackBar('编辑课程信息成功');
          return;
        }
        this.notificationService.showSnackBar('编辑已取消');
      });
    }
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
