import { Subscription } from 'rxjs';

export class UploadEntry {
  subscription?: Subscription;

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
    this.subscription?.unsubscribe();
  }

  cancelUpload() {
    this.subscription?.unsubscribe();
    this.uploading = false;
    this.uploaded = false;
  }
}
