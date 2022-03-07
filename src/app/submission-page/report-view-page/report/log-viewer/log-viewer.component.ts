import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubmissionService } from '../../../../service/submission.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css'],
})
export class LogViewerComponent implements OnInit, OnDestroy {
  streamedSubmissionId?: number;

  @Input() set submissionId(submissionId: number) {
    this.streamedSubmissionId = submissionId;
    this.streamLog();
  }

  log: string = '';

  logSubscription?: Subscription;

  ngOnDestroy() {
    this.logSubscription?.unsubscribe();
  }

  constructor(private submissionService: SubmissionService) {}

  ngOnInit(): void {}

  streamLog() {
    if (!this.streamedSubmissionId) return;
    this.logSubscription?.unsubscribe();
    this.logSubscription = this.submissionService
      .streamLog(this.streamedSubmissionId)
      .subscribe((resp) => {
        this.log += resp.getData();
      });
  }
}
