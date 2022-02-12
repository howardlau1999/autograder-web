import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}

  handleUnknownError(errorMessage: string) {
    this.snackBar.open(`未知错误 ${errorMessage}`, '关闭', { duration: 3000 });
  }
}
