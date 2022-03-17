import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  delay,
  from,
  mergeMap,
  of,
  retry,
  skipWhile,
  Subscription,
  zip,
} from 'rxjs';
import * as zipjs from '@zip.js/zip.js';
import { BlobWriter } from '@zip.js/zip.js';
import { ApiService } from '../../../api/api.service';
import { UserService } from '../../../service/user.service';
import { UploadEntry } from './upload.entry';
import { NotificationService } from '../../../service/notification.service';

export interface UploadDialogData {
  assignmentId: number;
  uploadLimit: number;
}

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css'],
})
export class UploadDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  assignmentId: number;

  manifestId: number | null = null;

  uploadEntries: { [filename: string]: UploadEntry } = {};

  uploadEntries$: BehaviorSubject<{ [filename: string]: UploadEntry }> = new BehaviorSubject<{
    [p: string]: UploadEntry;
  }>({});

  total: number = 0;

  totalSize: number = 0;

  uploaded: number = 0;

  errored: number = 0;

  loading: boolean = false;

  submitSubscription?: Subscription;

  manifestId$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  createManifestSubscription?: Subscription;

  uploadSubscriptions: Subscription[] = [];

  uploadLimit: number;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadDialogData,
    private apiService: ApiService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {
    this.assignmentId = data.assignmentId;
    this.uploadLimit = data.uploadLimit;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.submitSubscription?.unsubscribe();
    this.createManifestSubscription?.unsubscribe();
    this.uploadSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  onFileDelete(filename: string) {
    this.uploadEntries[filename].cancelUpload();
    const sub$ = this.apiService.deleteFileInManifest(this.manifestId!, filename).subscribe({
      next: () => {
        this.totalSize -= this.uploadEntries[filename].filesize;
        delete this.uploadEntries[filename];
        this.updateProgress();
        this.updateUploadEntries();
        sub$.unsubscribe();
      },
      error: ({ message }) => {
        this.notificationService.showSnackBar(`删除文件 ${filename} 出错：${message}`);
      },
    });
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer?.items) {
      const files: File[] = [];
      for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
        const item = event.dataTransfer.items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file !== null) {
            files.push(file);
          }
        }
        this.uploadFiles(files);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onCancelClicked(): void {
    this.cancelUpload();
    this.dialogRef.close();
  }

  createSubmission() {
    return this.apiService.createSubmission(
      this.assignmentId,
      this.manifestId!,
      [this.userService.user.userId!],
      'Howard Lau',
    );
  }

  onSubmitClicked(): void {
    this.loading = true;
    this.submitSubscription?.unsubscribe();
    this.submitSubscription = this.createSubmission().subscribe({
      next: (resp) => {
        this.loading = false;
        this.dialogRef.close(resp?.getSubmissionId());
      },
      error: ({ message }) => {
        this.loading = false;
        switch (message) {
          case 'SUBMISSION_LIMIT':
            this.notificationService.showSnackBar(`已达到提交次数限制`);
            break;
          case 'SUBMISSION_FREQUENCY':
            this.notificationService.showSnackBar(`已达到提交频率限制`);
            break;
          case 'MANIFEST_FILES':
            this.notificationService.showSnackBar(`提交超时，请重新上传`);
            break;
          default:
            this.notificationService.showSnackBar(`创建提交失败 ${message}`);
        }
      },
    });
  }

  onCancelUpload(): void {
    this.cancelUpload();
  }

  getManifestId() {
    if (this.createManifestSubscription === undefined) {
      this.createManifestSubscription = this.apiService
        .createManifest(this.assignmentId)
        .subscribe((resp) => {
          this.manifestId = resp.getManifestId();
          this.manifestId$.next(this.manifestId);
        });
    }
    return this.manifestId$.pipe(skipWhile((manifestId) => manifestId === 0));
  }

  fromZip(zipReader: zipjs.ZipReader, manifestId: number) {
    return from(zipReader.getEntries()).pipe(
      mergeMap((entries) => {
        zipReader.close().then();
        const fileEntries = entries.filter(
          (entry) => !entry.directory && entry.getData !== undefined,
        );
        const uploadEntries = fileEntries.map(
          (entry) => new UploadEntry(entry.filename, entry.uncompressedSize),
        );
        uploadEntries.forEach((entry) => {
          if (this.uploadEntries[entry.filename]) {
            this.uploadEntries[entry.filename]?.cancelUpload();
            this.totalSize -= this.uploadEntries[entry.filename].filesize;
          }
          this.uploadEntries[entry.filename] = entry;
          this.totalSize += entry.filesize;
          if (this.totalSize > this.uploadLimit) {
            this.uploadEntries[entry.filename].error = '大小超过限制';
          }
        });
        this.updateUploadEntries();
        this.updateProgress();
        return from(fileEntries);
      }),
      concatMap((entry) => {
        return zip(
          of(entry.filename),
          of(manifestId),
          from(entry.getData!(new BlobWriter()) as Promise<Blob>),
        ).pipe(delay(50));
      }),
    );
  }

  uploadFiles(files: File[]) {
    const subscription = this.getManifestId()
      .pipe(
        mergeMap((manifestId) => {
          return from(files).pipe(
            concatMap((file) => {
              if (file.type === 'application/x-zip-compressed' && !file.webkitRelativePath) {
                const blobReader = new zipjs.BlobReader(file);
                const zipReader = new zipjs.ZipReader(blobReader, {
                  useWebWorkers: true,
                  filenameEncoding: 'gbk',
                });
                return this.fromZip(zipReader, manifestId);
              }
              const filename = file.webkitRelativePath || file.name;
              const entry = new UploadEntry(filename, file.size);
              if (this.uploadEntries[filename]) {
                this.uploadEntries[filename]?.cancelUpload();
                this.totalSize -= this.uploadEntries[filename].filesize;
              }
              this.totalSize += file.size;
              this.uploadEntries[filename] = entry;
              if (this.totalSize > this.uploadLimit) {
                entry.error = '大小超过限制';
              }
              this.updateUploadEntries();
              this.updateProgress();
              return zip(of(filename), of(manifestId), of(file)).pipe(delay(50));
            }),
          );
        }),
      )
      .subscribe(([filename, manifestId, blob]) => {
        const entry = this.uploadEntries[filename];
        if (entry.error) return;
        entry.subscription = this.apiService
          .initUpload(filename, manifestId, entry.filesize)
          .pipe(
            mergeMap((resp) => {
              const token = resp?.getToken() || '';
              entry.progressBarMode = 'determinate';
              entry.uploadToken = token;
              return this.apiService.uploadFile(blob, token).pipe(
                catchError((err) => {
                  entry.progressBarMode = 'indeterminate';
                  throw err;
                }),
                retry({ delay: 1000, count: 5 }),
              );
            }),
            catchError((err) => {
              entry.progressBarMode = 'indeterminate';
              throw err;
            }),
            retry({ delay: 1000, count: 5 }),
            catchError(({ message }) => {
              entry.error = message;
              this.updateProgress();
              return of(null);
            }),
          )
          .subscribe((event) => {
            if (event === null) {
              this.updateUploadEntries();
              return;
            }
            if (event.type === HttpEventType.UploadProgress) {
              entry.uploadProgress = Math.round(100 * (event.loaded / event.total!));
            }
            if (event.type === HttpEventType.Response) {
              entry.finishUpload();
              this.updateProgress();
            }
          });
      });
    this.uploadSubscriptions.push(subscription);
  }

  uploadFileEvent(event: any) {
    this.uploadFiles(event.target.files as File[]);
  }

  updateProgress() {
    const filenames = Object.keys(this.uploadEntries);
    const total = filenames.length;
    let uploaded = 0;
    let errored = 0;
    filenames.forEach((fn) => {
      if (this.uploadEntries[fn].uploaded) uploaded += 1;
      if (this.uploadEntries[fn].error) errored += 1;
    });
    this.total = total;
    this.uploaded = uploaded;
    this.errored = errored;
  }

  updateUploadEntries() {
    this.uploadEntries$.next(this.uploadEntries);
  }

  cancelUpload() {
    const filenames = Object.keys(this.uploadEntries);
    filenames.forEach((filename) => {
      this.uploadEntries[filename].cancelUpload();
    });
    this.uploadEntries = {};
    this.updateUploadEntries();
  }

  ngAfterViewInit(): void {}
}
