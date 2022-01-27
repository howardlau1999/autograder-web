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
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = "http://localhost:9315"
  autograderClient = new AutograderServiceClient(this.host);

  constructor(private http: HttpClient) {}

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

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.host}/AutograderService/FileUpload`, formData, {
      reportProgress: true,
      observe: "events",
    });
  }
}
