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
import { catchError, of, Subscription } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

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

  loading: boolean = false;

  error?: any;

  progress: number = 0;

  downloadProgress: number = 0;

  downloadSubscription?: Subscription;

  @ViewChild('vcdrom') vcdromDiv!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnDestroy() {
    this.downloadSubscription?.unsubscribe();
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
    const subChunkLength = 128 * 1024;
    if (this.handler === undefined || !this.vcdFileURL) {
      return;
    }
    if (this.loading) {
      this.loading = false;
    }
    this.loading = true;
    this.downloadSubscription?.unsubscribe();
    this.downloadSubscription = fromFetch(this.vcdFileURL)
      .pipe(
        catchError((error) => {
          this.errorCallback(error);
          return of(null);
        }),
      )
      .subscribe((resp) => {
        if (!resp) return;
        if (!resp.ok) {
          this.errorCallback(resp.statusText);
          return;
        }
        if (!resp.body) {
          this.errorCallback('未知错误');
          return;
        }
        this.handler.onBegin();
        this.error = undefined;
        this.progress = 0;
        this.downloadProgress = 0;
        const reader = resp.body.getReader();
        const readCallback = (readResult: ReadableStreamDefaultReadResult<Uint8Array>) => {
          const { done, value } = readResult;
          if (done || !value) {
            return;
          }
          this.ngZone.run(() => {
            this.downloadProgress += value.length;
          });

          const chunkCallback = (start: number) => {
            const end = Math.min(value.length, start + subChunkLength);
            requestIdleCallback(() => {
              this.ngZone.run(() => {
                this.handler.onChunk(value.subarray(start, end));
                this.progress += end - start;
                if (this.progress === this.total) {
                  requestIdleCallback(() => {
                    this.handler.onEnd();
                    this.ngZone.run(() => {
                      this.loading = false;
                    });
                  });
                }
              });
              if (end < value.length) {
                chunkCallback(end);
              } else {
                reader.read().then(readCallback).catch(this.errorCallback.bind(this));
              }
            });
          };

          chunkCallback(0);
        };
        reader.read().then(readCallback).catch(this.errorCallback.bind(this));
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    vcdrom.vcdrom(this.vcdromDiv.nativeElement).then((handler: any) => {
      this.handler = handler;
      this.loadURL();
    });
  }
}
