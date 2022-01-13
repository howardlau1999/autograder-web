import {Injectable} from '@angular/core';
import {AutograderServiceClient, ServiceError} from "./proto/api_pb_service";
import {
  GetAssignmentsInCourseRequest,
  GetAssignmentsInCourseResponse,
  GetCourseListRequest,
  GetCourseListResponse, GetSubmissionsInAssignmentRequest, GetSubmissionsInAssignmentResponse,
  LoginRequest
} from "./proto/api_pb";
import {grpc} from "@improbable-eng/grpc-web";
import {AsyncSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  autograderClient = new AutograderServiceClient("http://localhost:9315");

  constructor() {}

  private messageCallback<T>(subject: AsyncSubject<T>) : (err: ServiceError | null, response: T | null) => void {
    return (err, response) => {
      if (err !== null || response === null) {
        subject.error(err);
        return;
      }
      subject.next(response);
      subject.complete();
    }
  }

  getCourseList() {
    const request = new GetCourseListRequest();
    request.setUserId(0);
    const subject = new AsyncSubject<GetCourseListResponse>();
    this.autograderClient.getCourseList(request, this.messageCallback(subject));
    return subject.asObservable();
  }

  getAssignmentsInCourse(courseId: number) {
    const request = new GetAssignmentsInCourseRequest();
    request.setCourseId(courseId);
    const subject = new AsyncSubject<GetAssignmentsInCourseResponse>();
    this.autograderClient.getAssignmentsInCourse(request, this.messageCallback(subject));
    return subject.asObservable();
  }

  getSubmissionsInAssignment(assignmentId: number) {
    const request = new GetSubmissionsInAssignmentRequest();
    request.setAssignmentId(assignmentId);
    const subject = new AsyncSubject<GetSubmissionsInAssignmentResponse>();
    this.autograderClient.getSubmissionsInAssignment(request, this.messageCallback(subject));
    return subject.asObservable();
  }
}
