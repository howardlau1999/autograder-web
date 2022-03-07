import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

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

  abortController = new AbortController();

  signal = this.abortController.signal;

  loading: boolean = false;

  error?: any;

  progress: number = 0;

  downloadProgress: number = 0;

  @ViewChild('vcdrom') vcdromDiv!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnDestroy() {
    this.abortController.abort();
  }

  @Input() set url(value: string) {
    this.vcdFileURL = value;
    this.loadURL();
  }

  errorCallback(error: any) {
    this.ngZone.run(() => {
      this.error = error;
      this.loading = false;
    });
    try {
      if (this.handler) {
        this.handler.onEnd();
      }
    } catch (e) {
      console.error(e);
    }
    this.vcdromDiv.nativeElement.innerHTML = '';
  }

  loadURL() {
    if (this.handler === undefined || !this.vcdFileURL) {
      return;
    }
    if (this.loading) {
      this.loading = false;
      this.abortController.abort();
    }
    this.loading = true;
    fetch(this.vcdFileURL, { method: 'get', signal: this.signal })
      .then((resp) => {
        if (!resp.ok) {
          this.errorCallback(resp.statusText);
          return;
        }
        this.handler.onBegin();
        this.error = undefined;
        this.progress = 0;
        this.downloadProgress = 0;
        const reader = resp.body?.getReader();
        const readCallback = (readResult: ReadableStreamDefaultReadResult<Uint8Array>) => {
          const { done, value } = readResult;
          const subChunkLength = 128 * 1024;
          if (done || !value) {
            this.ngZone.run(() => {
              this.loading = false;
            });
            this.vcdromDiv.nativeElement.innerHTML = `<div class="wd-progress">处理中……</div>`;
            requestIdleCallback(() => {
              this.handler.onEnd();
            });
            return;
          }
          this.ngZone.run(() => {
            this.downloadProgress += value.length;
          });
          const chunkCallback = (start: number) => {
            const end = Math.min(value.length, start + subChunkLength);
            const subChunk = value.subarray(start, end);
            this.handler.onChunk(subChunk);
            this.ngZone.run(() => {
              this.progress += subChunk.length;
            });
            requestIdleCallback(() => {
              this.handler.onChunk(value.subarray(start, end));
              if (end < value.length) {
                chunkCallback(end);
              } else {
                reader?.read().then(readCallback).catch(this.errorCallback.bind(this));
              }
            });
          };
          requestIdleCallback(() => {
            const end = Math.min(subChunkLength, value.length);
            this.handler.onChunk(value.subarray(0, end));
            if (end < value.length) {
              chunkCallback(end);
            } else {
              reader?.read().then(readCallback).catch(this.errorCallback.bind(this));
            }
          });
        };
        reader?.read().then(readCallback).catch(this.errorCallback.bind(this));
      })
      .catch(this.errorCallback.bind(this));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    vcdrom.vcdrom(this.vcdromDiv.nativeElement).then((handler: any) => {
      this.handler = handler;
      this.loadURL();
    });
  }
}
