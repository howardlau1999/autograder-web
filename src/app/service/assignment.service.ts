import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Either, right } from 'fp-ts/Either';
import { catchError, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { Assignment, SubmissionLimitConfig } from '../api/proto/model_pb';
import { ApiService } from '../api/api.service';
import { ErrorService, FormError } from './error.service';
import { CreateAssignmentResponse, UpdateAssignmentResponse } from '../api/proto/api_pb';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  constructor(private apiService: ApiService, private errorService: ErrorService) {}

  getAssignment(assignmentId: number) {
    return this.apiService.getAssignment(assignmentId);
  }

  hasLeaderboard(assignmentId: number) {
    return this.apiService.hasLeaderboard(assignmentId);
  }

  getLeaderboard(assignmentId: number) {
    return this.apiService.getLeaderboard(assignmentId);
  }

  deleteLeaderboard(assignmentId: number, userId: number) {
    return this.apiService.deleteLeaderboard(assignmentId, userId);
  }

  getAssignmentsInCourse(courseId: number) {
    return this.apiService.getAssignmentsInCourse(courseId);
  }

  updateAssignment(
    assignmentId: number,
    assignment: Assignment,
  ): Observable<Either<FormError, UpdateAssignmentResponse>> {
    return this.apiService.updateAssignment(assignmentId, assignment).pipe(
      map((resp) => right(resp)),
      catchError(this.errorService.getFormError),
    );
  }

  regradeAssignment(assignmentId: number) {
    return this.apiService.regradeAssignment(assignmentId);
  }

  changeLeaderboardAnonymous(assignmentId: number, anonymous: boolean) {
    return this.apiService.changeLeaderboardAnonymous(assignmentId, anonymous);
  }

  exportAssignmentGrades(assignmentId: number) {
    return this.apiService.exportAssignmentGrades(assignmentId);
  }

  createProgrammingAssignment(
    courseId: number,
    name: string,
    releaseDate: DateTime,
    dueDate: DateTime,
    description: string,
    dockerImage: string,
    tags: string[],
    cpu: number,
    memory: number,
    timeout: number,
    submissionLimit: SubmissionLimitConfig,
  ): Observable<Either<FormError, CreateAssignmentResponse>> {
    return this.apiService
      .createProgrammingAssignment(
        courseId,
        name,
        releaseDate,
        dueDate,
        description,
        dockerImage,
        tags,
        cpu,
        memory * 1024 * 1024,
        timeout,
        submissionLimit,
      )
      .pipe(
        map((resp) => right(resp)),
        catchError(this.errorService.getFormError),
      );
  }
}
