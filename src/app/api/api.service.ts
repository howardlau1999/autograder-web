import {Injectable} from '@angular/core';
import {AutograderServiceClient, ServiceError} from "./proto/api_pb_service";
import {
  CreateManifestRequest,
  CreateManifestResponse,
  GetAssignmentsInCourseRequest,
  GetAssignmentsInCourseResponse,
  GetCourseListRequest, GetCourseListResponse,
  GetSubmissionsInAssignmentRequest,
  GetSubmissionsInAssignmentResponse,
  InitUploadRequest,
  InitUploadResponse, LoginRequest, LoginResponse
} from "./proto/api_pb";
import {AsyncSubject, Observable, Subscriber} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = "http://localhost:9315"
  autograderClient = new AutograderServiceClient(this.host);

  constructor(private http: HttpClient) {
  }

  private messageCallback<T>(subscriber: Subscriber<T>): (err: ServiceError | null, response: T | null) => void {
    return (err, response) => {
      if (err !== null || response === null) {
        subscriber.error(err);
        return;
      }
      subscriber.next(response);
      subscriber.complete();
    }
  }

  login(username: string, password: string) {
    const request = new LoginRequest();
    request.setUsername(username);
    request.setPassword(password);
    return new Observable<LoginResponse>(subscriber => {
      this.autograderClient.login(request, this.messageCallback(subscriber));
    })
  }

  getCourseList() {
    const request = new GetCourseListRequest();
    request.setUserId(0);
    return new Observable<GetCourseListResponse>(subscriber => {
      this.autograderClient.getCourseList(request, this.messageCallback(subscriber));
    });
  }

  getAssignmentsInCourse(courseId: number) {
    const request = new GetAssignmentsInCourseRequest();
    request.setCourseId(courseId);
    return new Observable<GetAssignmentsInCourseResponse>(subscriber => {
      this.autograderClient.getAssignmentsInCourse(request, this.messageCallback(subscriber));
    });
  }

  getSubmissionsInAssignment(assignmentId: number) {
    const request = new GetSubmissionsInAssignmentRequest();
    request.setAssignmentId(assignmentId);
    return new Observable<GetSubmissionsInAssignmentResponse>(subscriber => {
      this.autograderClient.getSubmissionsInAssignment(request, this.messageCallback(subscriber));
    });
  }

  uploadFile(file: Blob, uploadToken: string) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.host}/AutograderService/FileUpload`, formData, {
      reportProgress: true,
      observe: "events",
      headers: {
        "Upload-token": uploadToken,
      }
    });
  }

  initUpload(filename: string, manifestId: number) {
    const request = new InitUploadRequest();
    request.setFilename(filename);
    request.setManifestId(manifestId);
    return new Observable<InitUploadResponse>(subscriber => {
      this.autograderClient.initUpload(request, this.messageCallback(subscriber));
    });
  }

  createManifest(assignmentId: number) {
    const request = new CreateManifestRequest();
    request.setUserId(1);
    request.setAssignmentId(assignmentId);
    return new Observable<CreateManifestResponse>(subscriber => {
      this.autograderClient.createManifest(request, this.messageCallback(subscriber));
    });
  }
}
