import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../api/api.service";
import {HttpEventType} from "@angular/common/http";
import {AsyncSubject, first, mergeMap, of, Subscription} from "rxjs";
import {map} from "rxjs/operators";

export interface UploadDialogData {
  assignmentId: number
}

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {
  filename = '';
  assignmentId: number;
  manifestId: number | null = null;
  uploadProgress: number = 0;
  progressBarMode: 'determinate' | 'indeterminate' = 'indeterminate';
  uploading: boolean = false;
  uploadSub: Subscription | null = null;

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

  onCancelUpload(): void {
    this.cancelUpload();
  }

  uploadFileEvent(event: any) {
    console.log(event);
    const file: File = event.target.files[0];
    if (!file) return;
    this.filename = file.name;
    this.uploading = true;
    this.progressBarMode = 'indeterminate';

    this.uploadSub = (this.manifestId === null ? this.apiService.createManifest(this.assignmentId).pipe(first(), map(resp => {
      return this.manifestId = resp.getManifestId();
    })) : of(this.manifestId)).pipe(first(), mergeMap(manifestId => {
      return this.apiService.initUpload(file.name, manifestId);
    })).pipe(first(), mergeMap(resp => {
      this.progressBarMode = 'determinate';
      return this.apiService.uploadFile(file);
    })).subscribe((event) => {
      if (event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
      }
      if (event.type == HttpEventType.Response) {
        console.log(event);
        this.cancelUpload();
      }
    });
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.uploadSub = null;
    this.uploading = false;
  }
}
