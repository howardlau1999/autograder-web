import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css'],
})
export class InspectionComponent implements OnInit {
  assignmentId$: Observable<number>;

  userId$: Observable<undefined | number>;

  submissionsRefresher$: Subject<null> = new Subject<null>();

  constructor(private route: ActivatedRoute, private router: Router) {
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
}
