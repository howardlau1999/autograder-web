import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Either, right } from 'fp-ts/Either';
import { catchError, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ErrorService, FormError } from './error.service';
import { AddCourseMembersRequest, CreateCourseResponse } from '../api/proto/api_pb';
import { CourseRoleMap } from '../api/proto/model_pb';

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

  updateCourseMember(courseId: number, userId: number, role: keyof CourseRoleMap) {
    return this.apiService.updateCourseMember(courseId, userId, role);
  }

  addCourseMembers(courseId: number, members: AddCourseMembersRequest.MemberToAdd[]) {
    return this.apiService.addCourseMembers(courseId, members);
  }

  removeCourseMembers(courseId: number, userIds: number[]) {
    return this.apiService.removeCourseMembers(courseId, userIds);
  }

  getCourseMembers(courseId: number) {
    return this.apiService.getCourseMembers(courseId);
  }
}
