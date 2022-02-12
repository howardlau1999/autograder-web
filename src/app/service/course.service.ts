import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Either, right } from 'fp-ts/Either';
import { catchError, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ErrorService, FormError } from './error.service';
import { CreateCourseResponse } from '../api/proto/api_pb';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private apiService: ApiService, private errorService: ErrorService) {}

  canWriteCourse(courseId: number) {
    return this.apiService.canWriteCourse(courseId);
  }

  createCourse(
    name: string,
    shortName: string,
    description: string,
  ): Observable<Either<FormError, CreateCourseResponse>> {
    return this.apiService.createCourse(name, shortName, description).pipe(
      map((resp) => right(resp)),
      catchError(this.errorService.getFormError),
    );
  }

  getCourse(courseId: number) {
    return this.apiService.getCourse(courseId);
  }

  getAssignmentsInCourse(courseId: number) {
    return this.apiService.getAssignmentsInCourse(courseId);
  }
}
