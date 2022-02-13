import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { BehaviorSubject, catchError, from, mergeMap, of, retry, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import * as zipjs from '@zip.js/zip.js';
import { BlobWriter } from '@zip.js/zip.js';
import { ApiService } from '../../../api/api.service';
import { UserService } from '../../../service/user.service';
import { UploadEntry } from './upload.entry';
import { NotificationService } from '../../../service/notification.service';

export interface UploadDialogData {
  assignmentId: number;
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

  uploaded: number = 0;

  errored: number = 0;

  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadDialogData,
    private apiService: ApiService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {
    this.assignmentId = data.assignmentId;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onFileDelete(filename: string) {
    this.uploadEntries[filename].cancelUpload();
    const sub$ = this.apiService.deleteFileInManifest(this.manifestId!, filename).subscribe({
      next: () => {
        delete this.uploadEntries[filename];
        this.updateProgress();
        this.updateUploadEntries();
        sub$.unsubscribe();
      },
      error: (error) => {
        this.notificationService.showSnackBar(`删除文件 ${filename} 出错：${error}`);
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
    this.createSubmission().subscribe({
      next: (resp) => {
        this.loading = false;
        this.dialogRef.close(resp?.getSubmissionId());
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.showSnackBar(`创建提交失败 ${error}`);
      },
    });
  }

  onCancelUpload(): void {
    this.cancelUpload();
  }

  uploadFiles(files: File[]) {
    (this.manifestId === null
      ? this.apiService.createManifest(this.assignmentId).pipe(
          map((resp) => {
            this.manifestId = resp?.getManifestId() || 0;
            return this.manifestId;
          }),
        )
      : of(this.manifestId)
    )
      .pipe(
        mergeMap((manifestId) => {
          return from(files).pipe(
            mergeMap((file) => {
              if (file.type === 'application/x-zip-compressed') {
                const blobReader = new zipjs.BlobReader(file);
                const zipReader = new zipjs.ZipReader(blobReader, { useWebWorkers: true });
                return from(zipReader.getEntries()).pipe(
                  mergeMap((entries) => {
                    const fileEntries = entries.filter(
                      (entry) => !entry.directory && entry.getData !== undefined,
                    );
                    const uploadEntries = fileEntries.map(
                      (entry) => new UploadEntry(entry.filename, entry.uncompressedSize),
                    );
                    uploadEntries.forEach((entry) => {
                      this.uploadEntries[entry.filename]?.cancelUpload();
                      this.uploadEntries[entry.filename] = entry;
                      return entry;
                    });
                    this.updateUploadEntries();
                    this.updateProgress();
                    return from(fileEntries);
                  }),
                  mergeMap((entry) => {
                    return zip(
                      of(entry.filename),
                      of(manifestId),
                      from(entry.getData!(new BlobWriter()) as Promise<Blob>),
                    );
                  }),
                );
              }
              this.uploadEntries[file.name] = new UploadEntry(file.name, file.size);
              this.updateUploadEntries();
              this.updateProgress();
              return zip(of(file.name), of(manifestId), of(file));
            }),
          );
        }),
      )
      .subscribe(([filename, manifestId, blob]) => {
        const entry = this.uploadEntries[filename];
        entry.sub = this.apiService
          .initUpload(filename, manifestId)
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
            catchError((err) => {
              entry.error = err;
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
      if (this.uploadEntries[fn].error !== null) errored += 1;
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
