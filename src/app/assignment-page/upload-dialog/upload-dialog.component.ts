import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../api/api.service";
import {HttpEventType} from "@angular/common/http";
import {BehaviorSubject, from, mergeMap, of, retry, Subscription, zip} from "rxjs";
import {map} from "rxjs/operators";
import * as zipjs from "@zip.js/zip.js";
import {BlobWriter} from "@zip.js/zip.js";
import {UserService} from "../../service/user.service";

export interface UploadDialogData {
  assignmentId: number
}

export class UploadEntry {
  sub: Subscription | null = null;
  filename = '';
  filesize: number = 0;
  uploadToken: string = '';
  uploading: boolean = false;
  uploaded: boolean = false;
  uploadProgress: number = 0;
  error: string | null = null;
  progressBarMode: 'determinate' | 'indeterminate' = 'indeterminate';

  constructor(filename: string, filesize: number) {
    this.filename = filename;
    this.uploading = true;
    this.filesize = filesize;
  }

  finishUpload() {
    this.uploaded = true;
    this.uploading = false;
    this.sub?.unsubscribe();
  }

  cancelUpload() {
    this.sub?.unsubscribe();
    this.uploading = false;
    this.uploaded = false;
  }
}

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit, AfterViewInit {
  assignmentId: number;
  manifestId: number | null = null;
  uploadEntries: { [filename: string]: UploadEntry } = {};
  uploadEntries$: BehaviorSubject<{ [filename: string]: UploadEntry }> = new BehaviorSubject<{ [p: string]: UploadEntry }>({});
  total: number = 0;
  uploaded: number = 0;

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UploadDialogData,
              private apiService: ApiService, private userService: UserService) {
    this.assignmentId = data.assignmentId;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onFileDelete(filename: string) {
    this.uploadEntries[filename].cancelUpload();
    const sub$ = this.apiService.deleteFileInManifest(this.manifestId!, filename).subscribe(
      resp => {
        delete this.uploadEntries[filename];
        this.updateProgress();
        this.updateUploadEntries();
        sub$.unsubscribe();
      }
    );
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer?.items) {
      const files: File[] = [];
      for (let i = 0; i < event.dataTransfer.items.length; ++i) {
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
    this.dialogRef.close(null);
  }

  createSubmission() {
    return this.apiService.createSubmission(this.assignmentId, this.manifestId!, [this.userService.user.userId!], "Howard Lau");
  }

  onSubmitClicked(): void {
    this.createSubmission().subscribe(resp => {
      this.dialogRef.close(resp.getSubmissionId());
    });
  }

  onCancelUpload(): void {
    this.cancelUpload();
  }

  uploadFiles(files: File[]) {
    (this.manifestId === null ? this.apiService.createManifest(this.assignmentId).pipe(map(resp => {
      return this.manifestId = resp.getManifestId();
    })) : of(this.manifestId)).pipe(mergeMap(manifestId => {
      return from(files).pipe(mergeMap(file => {
        if (file.type === 'application/x-zip-compressed') {
          const blobReader = new zipjs.BlobReader(file);
          const zipReader = new zipjs.ZipReader(blobReader, {useWebWorkers: true});
          return from(zipReader.getEntries()).pipe(mergeMap(entries => {
            const fileEntries = entries.filter(entry => !entry.directory && entry.getData !== undefined)
            const uploadEntries = fileEntries.map(entry => new UploadEntry(entry.filename, entry.uncompressedSize));
            uploadEntries.forEach(entry => this.uploadEntries[entry.filename] = entry);
            this.updateUploadEntries();
            this.updateProgress();
            return from(fileEntries);
          }), mergeMap(entry => {
            return zip(of(entry.filename), of(manifestId), from(entry.getData!(new BlobWriter()) as Promise<Blob>));
          }));
        }
        this.uploadEntries[file.name] = new UploadEntry(file.name, file.size);
        this.updateUploadEntries();
        this.updateProgress();
        return zip(of(file.name), of(manifestId), of(file));
      }))
    })).subscribe(([filename, manifestId, blob]) => {
      const entry = this.uploadEntries[filename];
      entry.sub = this.apiService.initUpload(filename, manifestId).pipe(mergeMap(resp => {
        const token = resp.getToken();
        entry.progressBarMode = 'determinate';
        entry.uploadToken = token;
        return this.apiService.uploadFile(blob, token);
      }), retry(5)).subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          entry.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
        if (event.type == HttpEventType.Response) {
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
    let total = 0;
    let uploaded = 0;
    for (const fn in this.uploadEntries) {
      total++;
      if (this.uploadEntries[fn].uploaded) uploaded++;
    }
    this.total = total;
    this.uploaded = uploaded;
  }

  updateUploadEntries() {
    this.uploadEntries$.next(this.uploadEntries);
  }

  cancelUpload() {
    for (const filename in this.uploadEntries) {
      this.uploadEntries[filename].cancelUpload();
    }
    this.uploadEntries = {};
    this.updateUploadEntries();
  }

  ngAfterViewInit(): void {

  }
}
