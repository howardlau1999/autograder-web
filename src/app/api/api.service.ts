import {Injectable} from '@angular/core';
import {AutograderServiceClient, ServiceError} from "./proto/api_pb_service";
import {
  CreateManifestRequest,
  CreateManifestResponse, CreateSubmissionRequest, CreateSubmissionResponse,
  GetAssignmentsInCourseRequest,
  GetAssignmentsInCourseResponse,
  GetCourseListRequest, GetCourseListResponse, GetSubmissionReportRequest, GetSubmissionReportResponse,
  GetSubmissionsInAssignmentRequest,
  GetSubmissionsInAssignmentResponse,
  InitUploadRequest,
  InitUploadResponse, LoginRequest, LoginResponse, SubscribeSubmissionRequest, SubscribeSubmissionResponse
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
        subscriber.error(err?.message);
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
      const resp = this.autograderClient.login(request, this.messageCallback(subscriber));
      return resp.cancel;
    });
  }

  getCourseList(userId: number) {
    const request = new GetCourseListRequest();
    request.setUserId(userId);
    return new Observable<GetCourseListResponse>(subscriber => {
      const resp = this.autograderClient.getCourseList(request, this.messageCallback(subscriber));
      return resp.cancel;
    });
  }

  getAssignmentsInCourse(courseId: number) {
    const request = new GetAssignmentsInCourseRequest();
    request.setCourseId(courseId);
    return new Observable<GetAssignmentsInCourseResponse>(subscriber => {
      const resp = this.autograderClient.getAssignmentsInCourse(request, this.messageCallback(subscriber));
      return resp.cancel;
    });
  }

  getSubmissionsInAssignment(assignmentId: number) {
    const request = new GetSubmissionsInAssignmentRequest();
    request.setAssignmentId(assignmentId);
    request.setUserId(1);
    return new Observable<GetSubmissionsInAssignmentResponse>(subscriber => {
      const resp = this.autograderClient.getSubmissionsInAssignment(request, this.messageCallback(subscriber));
      return resp.cancel;
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
      const resp = this.autograderClient.initUpload(request, this.messageCallback(subscriber));
      return resp.cancel;
    });
  }

  createManifest(userId: number, assignmentId: number) {
    const request = new CreateManifestRequest();
    request.setUserId(userId);
    request.setAssignmentId(assignmentId);
    return new Observable<CreateManifestResponse>(subscriber => {
      const resp = this.autograderClient.createManifest(request, this.messageCallback(subscriber));
      return resp.cancel;
    });
  }

  createSubmission(userId: number, assigmentId: number, manifestId: number, submitters: number[]) {
    const request = new CreateSubmissionRequest();
    request.setUserId(userId);
    request.setSubmittersList(submitters);
    request.setManifestId(manifestId);
    request.setAssignmentId(assigmentId);
    return new Observable<CreateSubmissionResponse>(subscriber => {
      const resp = this.autograderClient.createSubmission(request, this.messageCallback(subscriber));
      return resp.cancel;
    });
  }

  subscribeSubmission(submissionId: number) {
    const request = new SubscribeSubmissionRequest();
    request.setSubmissionId(submissionId);
    const stream = this.autograderClient.subscribeSubmission(request);
    return new Observable<SubscribeSubmissionResponse>(subscriber => {
      stream.on("data", (resp) => {
        subscriber.next(resp);
      });
      stream.on("end", (status) => {
        subscriber.complete();
      });
      return stream.cancel;
    });
  }

  getSubmissionReport(submissionId: number) {
    const request = new GetSubmissionReportRequest();
    request.setSubmissionId(submissionId);
    return new Observable<GetSubmissionReportResponse>(subscriber => {
      const resp = this.autograderClient.getSubmissionReport(request, this.messageCallback(subscriber));
      return resp.cancel;
    });
  }
}
