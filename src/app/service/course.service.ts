import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Either, left, right } from 'fp-ts/Either';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ErrorService, FormError } from './error.service';
import {
  AddCourseMembersRequest,
  CreateCourseResponse,
  UpdateCourseResponse,
} from '../api/proto/api_pb';
import { CourseRoleMap } from '../api/proto/model_pb';

export enum JoinCourseError {
  InvalidJoinCode,
  Unknown,
}

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

  updateCourse(
    courseId: number,
    name: string,
    shortName: string,
    description: string,
  ): Observable<Either<FormError, UpdateCourseResponse>> {
    return this.apiService.updateCourse(courseId, name, shortName, description).pipe(
      map((resp) => right(resp)),
      catchError(this.errorService.getFormError),
    );
  }

  getCourse(courseId: number) {
    return this.apiService.getCourse(courseId);
  }

  updateCourseMember(courseId: number, userId: number, role: CourseRoleMap[keyof CourseRoleMap]) {
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

  changeAllowsJoinCourse(courseId: number, allowsJoin: boolean) {
    return this.apiService.changeAllowsJoinCourse(courseId, allowsJoin);
  }

  generateJoinCode(courseId: number) {
    return this.apiService.generateJoinCode(courseId);
  }

  joinCourse(code: string): Observable<Either<JoinCourseError, number>> {
    return this.apiService.joinCourse(code).pipe(
      map((resp) => {
        return right(resp.getCourseId());
      }),
      catchError(({ message }) => {
        if (message === 'INVALID_JOIN_CODE' || message === 'INVALID_COURSE_ID') {
          return of(left(JoinCourseError.InvalidJoinCode));
        }
        return of(left(JoinCourseError.Unknown));
      }),
    );
  }
}
