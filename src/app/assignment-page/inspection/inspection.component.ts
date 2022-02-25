import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AssignmentService } from '../../service/assignment.service';
import { NotificationService } from '../../service/notification.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentService: AssignmentService,
    private notificationService: NotificationService,
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
  }

  ngOnInit(): void {}

  onUserChange(userId: number) {
    const commands: any[] = ['inspection', userId];
    this.router.navigate(commands, { relativeTo: this.route.parent });
  }

  onSubmissionChange(submissionId: number) {
    const commands: any[] = ['submissions', submissionId];
    this.router.navigate(commands, { relativeTo: this.route.parent });
  }

  ngOnDestroy() {
    this.regradeAssignmentSubscription?.unsubscribe();
  }

  regradeAssignment() {
    this.regradeAssignmentSubscription?.unsubscribe();
    this.regradeAssignmentSubscription = this.assignmentId$
      .pipe(
        switchMap((assignmentId) => {
          return this.assignmentService.regradeAssignment(assignmentId);
        }),
      )
      .subscribe(() => {
        this.notificationService.showSnackBar('提交重评成功');
      });
  }
}
