import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private apiService: ApiService) {}

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

  getDownloadURL(filename: string, token: string) {
    return `${
      environment.serverHost
    }/AutograderService/FileDownload/${filename}?token=${encodeURIComponent(token)}`;
  }
}
