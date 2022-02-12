import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string) {
    this.snackBar.open(message, '关闭', { duration: 3000 });
  }
}
