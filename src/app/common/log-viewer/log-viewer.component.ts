import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { catchError, Subscription } from 'rxjs';
import { FitAddon } from '@xterm/addon-fit';
import type { Terminal } from '@xterm/xterm';
import { SubmissionService } from '../../service/submission.service';
import { retryExponentialBackoff } from '../operator/retryExponentialBackoff';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class LogViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  streamedSubmissionId?: number;

  @ViewChild('terminal') terminalDiv!: ElementRef;

  term?: Terminal;

  terminalData?: string;

  fitAddon?: FitAddon;

  initCallbacks: any[] = [];

  @Input() set submissionId(submissionId: number) {
    this.streamedSubmissionId = submissionId;
    this.streamLog();
  }

  @Input() set data(data: string) {
    this.terminalData = data;
  }

  logSubscription?: Subscription;

  streamEnded = false;

  // Set when the log stream errored and cleared by the next chunk, so that a
  // completion can be told apart from an exhausted retry budget.
  private streamErrored = false;

  ngOnDestroy() {
    this.logSubscription?.unsubscribe();
  }

  constructor(private submissionService: SubmissionService) {}

  ngOnInit(): void {
    import('@xterm/xterm').then(({ Terminal }) => {
      this.term = new Terminal({ rows: 40, convertEol: true, disableStdin: true });
      this.fitAddon = new FitAddon();
      this.term.loadAddon(this.fitAddon as any);
      this.initCallbacks.forEach((cb) => cb());
    });
  }

  ngAfterViewInit() {
    const initCallback = () => {
      this.term?.open(this.terminalDiv.nativeElement);
      this.fitAddon?.fit();
      if (this.terminalData) this.term?.write(this.terminalData);
      if (this.streamedSubmissionId) this.streamLog();
    };
    if (this.term) {
      initCallback();
    } else {
      this.initCallbacks.push(initCallback);
    }
  }

  streamLog() {
    if (!this.streamedSubmissionId) return;
    this.logSubscription?.unsubscribe();
    this.streamEnded = false;
    this.streamErrored = false;
    this.logSubscription = this.submissionService
      .streamLog(this.streamedSubmissionId)
      .pipe(
        catchError((error) => {
          this.term?.clear();
          this.streamErrored = true;
          throw error;
        }),
        retryExponentialBackoff(),
      )
      .subscribe({
        next: (resp) => {
          this.streamErrored = false;
          this.term?.write(resp.getData_asU8());
        },
        // retryWhen completes rather than errors once its retry budget is
        // spent, so an exhausted stream arrives here looking like a normal
        // end; the error flag tells the two apart. A stream that ended because
        // grading finished (or after an auth failure, which the API layer
        // completes after logging out) carries no pending error.
        complete: () => {
          if (this.streamErrored) {
            this.onStreamLost();
          }
        },
        error: () => this.onStreamLost(),
      });
  }

  private onStreamLost() {
    this.streamEnded = true;
    this.term?.write('\r\n\x1b[31m[日志流已断开，自动重试已耗尽，请点击“重新连接”。]\x1b[0m\r\n');
  }

  reconnect() {
    this.term?.clear();
    this.streamLog();
  }
}
