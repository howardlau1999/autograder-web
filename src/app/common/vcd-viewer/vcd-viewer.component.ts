import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { catchError, of, Subscription } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

import { vcdrom, VcdromHandler } from './vcdrom';

@Component({
  selector: 'app-vcd-viewer',
  templateUrl: './vcd-viewer.component.html',
  styleUrls: ['./vcd-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class VcdViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  handler?: VcdromHandler;

  vcdFileURL?: string;

  @Input() total?: number;

  loading: boolean = false;

  error?: any;

  progress: number = 0;

  downloadProgress: number = 0;

  downloadSubscription?: Subscription;

  private load = 0;

  @ViewChild('vcdrom') vcdromDiv!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnDestroy() {
    this.downloadSubscription?.unsubscribe();
    this.handler?.onAbort();
  }

  @Input() set url(value: string) {
    this.vcdFileURL = value;
    this.loadURL();
  }

  errorCallback(error: any) {
    this.ngZone.run(() => {
      this.error = error instanceof Error ? error.message : error;
      this.loading = false;
    });
    this.handler?.onAbort();
  }

  loadURL() {
    const subChunkLength = 128 * 1024;
    const handler = this.handler;
    if (handler === undefined || !this.vcdFileURL) {
      return;
    }
    if (this.loading) {
      this.loading = false;
    }
    this.loading = true;
    // Chunks of a superseded download must not reach the parser session
    // started for the newer URL.
    const load = ++this.load;
    const fail = (error: unknown) => {
      if (load === this.load) {
        this.errorCallback(error);
      }
    };
    this.downloadSubscription?.unsubscribe();
    this.downloadSubscription = fromFetch(this.vcdFileURL)
      .pipe(
        catchError((error) => {
          fail(error);
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
        handler.onBegin();
        this.error = undefined;
        this.progress = 0;
        this.downloadProgress = 0;
        const reader = resp.body.getReader();
        const readCallback = (readResult: ReadableStreamReadResult<Uint8Array>) => {
          const { done, value } = readResult;
          if (load !== this.load) {
            reader.cancel();
            return;
          }
          if (done || !value) {
            // Every chunk has been handed over: the next read() is only
            // issued after the last sub-chunk of the previous one.
            handler.onEnd();
            this.ngZone.run(() => {
              this.loading = false;
            });
            return;
          }
          this.ngZone.run(() => {
            this.downloadProgress += value.length;
          });

          const chunkCallback = (start: number) => {
            const end = Math.min(value.length, start + subChunkLength);
            requestIdleCallback(() => {
              if (load !== this.load) {
                reader.cancel();
                return;
              }
              this.ngZone.run(() => {
                handler.onChunk(value.subarray(start, end));
                this.progress += end - start;
              });
              if (end < value.length) {
                chunkCallback(end);
              } else {
                reader.read().then(readCallback).catch(fail);
              }
            });
          };

          chunkCallback(0);
        };
        reader.read().then(readCallback).catch(fail);
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    vcdrom(this.vcdromDiv.nativeElement, {
      onError: (error) => this.errorCallback(error),
    }).then(
      (handler) => {
        this.handler = handler;
        this.loadURL();
      },
      (error) => this.errorCallback(error),
    );
  }
}
