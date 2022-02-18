import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-vcd-viewer',
  templateUrl: './vcd-viewer.component.html',
  styleUrls: ['./vcd-viewer.component.css'],
})
export class VcdViewerComponent implements OnInit, AfterViewInit {
  handler?: any;

  _url?: string;

  httpSubscription?: Subscription;

  abortController = new AbortController();

  signal = this.abortController.signal;

  loading: boolean = false;

  @ViewChild('vcdrom') vcdrom!: ElementRef;

  constructor(private notificationService: NotificationService) {}

  ngOnDestroy() {
    this.abortController.abort();
  }

  @Input() set url(value: string) {
    this._url = value;
    this.loadURL();
  }

  loadURL() {
    if (this.handler === undefined || !this._url) {
      return;
    }
    if (this.loading) {
      this.abortController.abort();
    }
    this.loading = true;
    this.handler.onBegin();
    fetch(this._url, { method: 'get', signal: this.signal })
      .then((resp) => {
        const reader = resp.body?.getReader();
        const readCallback = (readResult: ReadableStreamDefaultReadResult<Uint8Array>) => {
          const { done, value } = readResult;
          if (done) {
            this.loading = false;
            this.handler.onEnd();
            return;
          }
          this.handler.onChunk(value);
          reader?.read().then(readCallback);
        };
        reader?.read().then(readCallback);
      })
      .catch((error) => {
        this.loading = false;
        this.notificationService.showSnackBar(`加载出错 ${error}`);
        this.handler.onEnd();
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    (window as any).VCDrom(this.vcdrom.nativeElement).then((handler: any) => {
      this.handler = handler;
      this.loadURL();
    });
  }
}
