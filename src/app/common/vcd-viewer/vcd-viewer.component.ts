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

const vcdrom = require('./vcdrom');

@Component({
  selector: 'app-vcd-viewer',
  templateUrl: './vcd-viewer.component.html',
  styleUrls: ['./vcd-viewer.component.css'],
})
export class VcdViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  handler?: any;

  vcdFileURL?: string;

  @Input() total?: number;

  httpSubscription?: Subscription;

  abortController = new AbortController();

  signal = this.abortController.signal;

  loading: boolean = false;

  @ViewChild('vcdrom') vcdrom!: ElementRef;

  constructor() {}

  ngOnDestroy() {
    this.abortController.abort();
  }

  @Input() set url(value: string) {
    this.vcdFileURL = value;
    this.loadURL();
  }

  errorCallback(error: any) {
    this.vcdrom.nativeElement.innerHTML = `<div class="wd-progress">无法打开文件（错误信息：${error}）</div>`;
    this.loading = false;
    try {
      if (this.handler) {
        this.handler.onEnd();
      }
    } catch (e) {}
  }

  loadURL() {
    if (this.handler === undefined || !this.vcdFileURL) {
      return;
    }
    if (this.loading) {
      this.abortController.abort();
    }
    this.loading = true;
    fetch(this.vcdFileURL, { method: 'get', signal: this.signal })
      .then((resp) => {
        if (!resp.ok) {
          this.errorCallback(resp.statusText);
          return;
        }
        this.handler.onBegin(this.total || 0);
        const reader = resp.body?.getReader();
        const readCallback = (readResult: ReadableStreamDefaultReadResult<Uint8Array>) => {
          const { done, value } = readResult;
          const subChunkLength = 128 * 1024;
          if (done || !value) {
            this.loading = false;
            this.handler.onEnd();
            return;
          }
          let start = 0;
          let end = Math.min(value.length, start + subChunkLength);
          const chunkCallback = () => {
            start += subChunkLength;
            if (start >= value.length) {
              reader?.read().then(readCallback).catch(this.errorCallback.bind(this));
              return;
            }
            end = Math.min(value.length, start + subChunkLength);
            requestIdleCallback(() => {
              this.handler.onChunk(value.subarray(start, end));
              chunkCallback();
            });
          };
          requestIdleCallback(() => {
            this.handler.onChunk(value.subarray(start, end));
            chunkCallback();
          });
        };
        reader?.read().then(readCallback).catch(this.errorCallback.bind(this));
      })
      .catch(this.errorCallback.bind(this));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    vcdrom.vcdrom(this.vcdrom.nativeElement).then((handler: any) => {
      this.handler = handler;
      this.loadURL();
    });
  }
}
