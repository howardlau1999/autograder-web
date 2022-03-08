import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Either, left, right } from 'fp-ts/Either';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiService } from '../api/api.service';
import { NotificationService } from './notification.service';
import { SubmissionStatus, SubmissionStatusMap } from '../api/proto/model_pb';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private apiService: ApiService, private notificationService: NotificationService) {}

  isSubmissionQueued(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.QUEUED;
  }

  isSubmissionRunning(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.RUNNING;
  }

  isSubmissionFinished(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.FINISHED;
  }

  isSubmissionCancelling(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.CANCELLING;
  }

  isSubmissionCancelled(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.CANCELLED;
  }

  isSubmissionFailed(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return status === SubmissionStatus.FAILED;
  }

  isSubmissionPending(status: SubmissionStatusMap[keyof SubmissionStatusMap]) {
    return (
      status === SubmissionStatus.CANCELLING ||
      status === SubmissionStatus.RUNNING ||
      status === SubmissionStatus.QUEUED
    );
  }

  getSubmissionsInAssignment(assignmentId: number) {
    return this.apiService.getSubmissionsInAssignment(assignmentId);
  }

  inspectUserSubmissionHistory(userId: number, assignmentId: number) {
    return this.apiService.inspectUserSubmissionHistory(userId, assignmentId);
  }

  inspectAllSubmissionsInAssignment(assignmentId: number) {
    return this.apiService.inspectAllSubmissionsInAssignment(assignmentId);
  }

  subscribeSubmission(submissionId: number) {
    return this.apiService.subscribeSubmission(submissionId);
  }

  downloadSubmission(submissionId: number) {
    return this.apiService.initDownload(submissionId, '', true);
  }

  getSubmissionReport(submissionId: number) {
    return this.apiService.getSubmissionReport(submissionId);
  }

  regradeSubmission(submissionId: number) {
    return this.apiService.regradeSubmission(submissionId);
  }

  downloadOutputFile(submissionId: number, filename: string) {
    return this.apiService.initDownload(submissionId, filename, false, true);
  }

  getDownloadURL(filename: string, token: string) {
    return `${
      environment.serverHost
    }/AutograderService/FileDownload/${filename}?token=${encodeURIComponent(token)}`;
  }

  activateSubmission(submissionId: number): Observable<Either<string, boolean>> {
    return this.apiService.activateSubmission(submissionId).pipe(
      map((resp) => right(resp.getActivated())),
      catchError(({ message }) => {
        return of(left(message));
      }),
    );
  }

  cancelSubmission(submissionId: number) {
    return this.apiService.cancelSubmission(submissionId);
  }

  streamLog(submissionId: number) {
    return this.apiService.streamLog(submissionId);
  }
}
