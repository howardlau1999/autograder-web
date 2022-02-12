import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apiService: ApiService, private notificationService: NotificationService) {}

  getCourseList() {
    return this.apiService.getCourseList().pipe(
      map((resp) => resp?.getCoursesList() || []),
      catchError(({ message }) => {
        this.notificationService.showSnackBar(`发生错误 ${message}`);
        return of([]);
      }),
    );
  }
}
