import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { match } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { CourseService, JoinCourseError } from '../../service/course.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-join-dialog',
  templateUrl: './join-dialog.component.html',
  styleUrls: ['./join-dialog.component.css'],
})
export class JoinDialogComponent implements OnInit {
  invitationCode = new FormControl('');

  joinSubscription?: Subscription;

  joining: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<JoinDialogComponent>,
    private courseService: CourseService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {}

  onConfirmClicked() {
    this.joining = true;
    this.joinSubscription?.unsubscribe();
    this.joinSubscription = this.courseService
      .joinCourse(this.invitationCode.value)
      .subscribe((result) => {
        pipe(
          result,
          match(
            (error) => {
              this.joining = false;
              if (error === JoinCourseError.InvalidJoinCode) {
                this.notificationService.showSnackBar('加课码无效');
                return;
              }
              this.notificationService.showSnackBar('未知错误');
            },
            () => {
              this.joining = true;
              this.dialogRef.close(true);
              this.notificationService.showSnackBar('加课成功');
            },
          ),
        );
      });
  }

  onCancelClicked() {
    this.dialogRef.close();
  }
}
