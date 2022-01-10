import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface SubmissionHistory {
  submissionId: string;
  assignmentId: string;
  submittedAt: Date;
  score: number;
  testedScore: number;
  fullScore: number;
  status: string;
}

@Component({
  selector: 'app-assignment-page',
  templateUrl: './assignment-page.component.html',
  styleUrls: ['./assignment-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssignmentPageComponent implements OnInit {

  dummyArray: SubmissionHistory[] = [{
    submissionId: '1',
    assignmentId: '1',
    submittedAt: new Date(),
    score: 30,
    testedScore: 70,
    fullScore: 100,
    status: 'Queued',
  }];

  columnsToDisplay = ['submissionId', 'submittedAt', 'status', 'score', 'operations'];

  expandedSubmission: SubmissionHistory | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
