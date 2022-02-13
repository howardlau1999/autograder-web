import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(private apiService: ApiService) {}

  getSubmissionsInAssignment(assignmentId: number) {
    return this.apiService.getSubmissionsInAssignment(assignmentId);
  }

  subscribeSubmission(submissionId: number) {
    return this.apiService.subscribeSubmission(submissionId);
  }
}
