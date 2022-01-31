import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../api/api.service";
import {HttpEventType} from "@angular/common/http";
import {AsyncSubject, BehaviorSubject, filter, first, from, mergeMap, of, Subscription, zip} from "rxjs";
import {map} from "rxjs/operators";
import * as zipjs from "@zip.js/zip.js";
import {BlobWriter} from "@zip.js/zip.js";

export interface UploadDialogData {
  assignmentId: number
}

export class UploadEntry {
  sub: Subscription | null = null;
  filename = '';
  uploading: boolean = false;
  uploaded: boolean = false;
  uploadProgress: number = 0;
  progressBarMode: 'determinate' | 'indeterminate' = 'indeterminate';

  constructor(filename: string) {
    this.filename = filename;
    this.uploading = true;
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
export class UploadDialogComponent implements OnInit {
  assignmentId: number;
  manifestId: number | null = null;
  uploadEntries: { [filename: string]: UploadEntry } = {};
  uploadEntries$: BehaviorSubject<{ [filename: string]: UploadEntry }> = new BehaviorSubject<{ [p: string]: UploadEntry }>({});
  total: number = 0;
  uploaded: number = 0;

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UploadDialogData,
              private apiService: ApiService) {
    this.assignmentId = data.assignmentId;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onDrop(event: any) {
    event.preventDefault();
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  onCancelClicked(): void {
    this.cancelUpload();
    this.dialogRef.close();
  }

  createSubmission() {
    return this.apiService.createSubmission(1, this.assignmentId, this.manifestId!, [1]);
  }

  onSubmitClicked(): void {
    this.createSubmission().subscribe(resp => {
      console.log(resp.getFilesList());
      console.log(resp.getSubmissionId());
      this.dialogRef.close();
    });
  }

  onCancelUpload(): void {
    this.cancelUpload();
  }

  uploadFileEvent(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    if (file.type !== 'application/x-zip-compressed') return;
    const blobReader = new zipjs.BlobReader(file);
    const zipReader = new zipjs.ZipReader(blobReader, {useWebWorkers: true});
    (this.manifestId === null ? this.apiService.createManifest(1, this.assignmentId).pipe(first(), map(resp => {
      return this.manifestId = resp.getManifestId();
    })) : of(this.manifestId)).subscribe(manifestId => {
      from(zipReader.getEntries()).pipe(mergeMap(entries => {
        const fileEntries = entries.filter(entry => !entry.directory && entry.getData !== undefined)
        const uploadEntries = fileEntries.map(entry => new UploadEntry(entry.filename));
        uploadEntries.forEach(entry => this.uploadEntries[entry.filename] = entry);
        this.updateUploadEntries();
        this.updateProgress();
        return from(fileEntries);
      }), filter(entry => !entry.directory && entry.getData !== undefined), mergeMap(entry => {
        return zip(of(entry.filename), from(entry.getData!(new BlobWriter()) as Promise<Blob>));
      })).subscribe(([filename, blob]) => {
        const entry = this.uploadEntries[filename];
        entry.sub = this.apiService.initUpload(filename, manifestId).pipe(mergeMap(resp => {
          entry.progressBarMode = 'determinate';
          const token = resp.getToken();
          return this.apiService.uploadFile(blob, token);
        })).subscribe((event) => {
          if (event.type == HttpEventType.UploadProgress) {
            entry.uploadProgress = Math.round(100 * (event.loaded / event.total!));
          }
          if (event.type == HttpEventType.Response) {
            entry.finishUpload();
            this.updateProgress();
          }
        });
      })
    })
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
}
