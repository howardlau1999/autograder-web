import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./assignment-page.component.css']
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

  constructor() { }

  ngOnInit(): void {
  }

}
