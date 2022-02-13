import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AssignmentService } from '../service/assignment.service';

@Component({
  selector: 'app-assignment-page',
  templateUrl: './assignment-page.component.html',
  styleUrls: ['./assignment-page.component.css'],
})
export class AssignmentPageComponent implements OnInit {
  assignmentId$: Observable<number>;

  hasLeaderboard$: Observable<boolean>;

  constructor(private route: ActivatedRoute, private assignmentService: AssignmentService) {
    this.assignmentId$ = this.route.paramMap.pipe(
      map((params) => Number.parseInt(params.get('assignmentId') || '0', 10)),
    );
    this.hasLeaderboard$ = this.assignmentId$.pipe(
      switchMap((assignmentId) => this.assignmentService.hasLeaderboard(assignmentId)),
      map((resp) => resp.getHasLeaderboard()),
    );
  }

  ngOnInit(): void {}
}
