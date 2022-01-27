import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../api/api.service";
import {HttpEventType} from "@angular/common/http";
import {Subscription} from "rxjs";

export interface DialogData {

}

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {
  filename = '';
  manifestId: number | null = null;
  uploadProgress: number = 0;
  uploading: boolean = false;
  uploadSub: Subscription | null = null;

  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  onDrop(event: any) {
    event.preventDefault();
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  onCancelClicked(): void {
    this.dialogRef.close();
  }

  uploadFileEvent(event: any) {
    console.log(event);
    const file: File = event.target.files[0];
    if (file) {
      this.filename = file.name;
      this.uploadSub = this.apiService.uploadFile(file).subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        }
        if (event.type == HttpEventType.Response) {
          console.log(event);
          this.cancelUpload();
        }
      });
    }
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.uploadSub = null;
    this.uploading = false;
  }
}
