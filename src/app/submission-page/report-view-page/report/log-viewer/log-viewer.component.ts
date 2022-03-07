import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Terminal } from 'xterm';
import { SubmissionService } from '../../../../service/submission.service';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css'],
})
export class LogViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  streamedSubmissionId?: number;

  @ViewChild('terminal') terminalDiv!: ElementRef;

  term?: Terminal;

  @Input() set submissionId(submissionId: number) {
    this.streamedSubmissionId = submissionId;
    this.streamLog();
  }

  logSubscription?: Subscription;

  ngOnDestroy() {
    this.logSubscription?.unsubscribe();
  }

  constructor(private submissionService: SubmissionService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.term = new Terminal({ rows: 40, cols: 100 });
    this.term.open(this.terminalDiv.nativeElement);
  }

  streamLog() {
    if (!this.streamedSubmissionId) return;
    this.term?.clear();
    this.logSubscription?.unsubscribe();
    this.logSubscription = this.submissionService
      .streamLog(this.streamedSubmissionId)
      .subscribe((resp) => {
        this.term?.write(resp.getData());
      });
  }
}
