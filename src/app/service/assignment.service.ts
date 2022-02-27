import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Either, right } from 'fp-ts/Either';
import { catchError, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { Assignment } from '../api/proto/model_pb';
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
    cpu: number,
    memory: number,
  ): Observable<Either<FormError, CreateAssignmentResponse>> {
    return this.apiService
      .createProgrammingAssignment(
        courseId,
        name,
        releaseDate,
        dueDate,
        description,
        dockerImage,
        cpu,
        memory * 1024 * 1024,
      )
      .pipe(
        map((resp) => right(resp)),
        catchError(this.errorService.getFormError),
      );
  }
}
