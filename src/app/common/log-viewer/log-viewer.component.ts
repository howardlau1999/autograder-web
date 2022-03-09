import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { catchError, Subscription } from 'rxjs';
import { FitAddon } from 'xterm-addon-fit';
import type { Terminal } from 'xterm';
import { SubmissionService } from '../../service/submission.service';
import { retryExponentialBackoff } from '../operator/retryExponentialBackoff';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css'],
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

  ngOnDestroy() {
    this.logSubscription?.unsubscribe();
  }

  constructor(private submissionService: SubmissionService) {}

  ngOnInit(): void {
    import('xterm').then(({ Terminal }) => {
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
    this.logSubscription = this.submissionService
      .streamLog(this.streamedSubmissionId)
      .pipe(
        catchError((error) => {
          this.term?.clear();
          throw error;
        }),
        retryExponentialBackoff(),
      )
      .subscribe((resp) => {
        this.term?.write(resp.getData_asU8());
      });
  }
}
