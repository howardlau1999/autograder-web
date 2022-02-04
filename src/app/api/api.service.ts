import {Injectable} from '@angular/core';
import {AutograderServiceClient, ServiceError, UnaryResponse} from "./proto/api_pb_service";
import {
  CreateManifestRequest,
  CreateSubmissionRequest, GetAssignmentRequest,
  GetAssignmentsInCourseRequest,
  GetCourseListRequest, GetCourseRequest,
  GetSubmissionReportRequest,
  GetSubmissionsInAssignmentRequest,
  InitUploadRequest,
  LoginRequest,
  SubscribeSubmissionRequest,
  SubscribeSubmissionResponse
} from "./proto/api_pb";
import {Observable, Subscriber} from "rxjs";
import {HttpClient} from "@angular/common/http";


type UnaryCallback<Response> = (err: ServiceError | null, response: Response | null) => void;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = "http://localhost:9315"
  autograderClient = new AutograderServiceClient(this.host);

  constructor(private http: HttpClient) {
  }

  private messageCallback<T>(subscriber: Subscriber<T>): UnaryCallback<T> {
    return (err, response) => {
      if (err !== null || response === null) {
        subscriber.error(err?.message);
        return;
      }
      subscriber.next(response);
      subscriber.complete();
    }
  }

  private unary<Request, Response>(
    endpoint: (request: Request, callback: UnaryCallback<Response>) => UnaryResponse,
    request: Request
  ): Observable<Response> {
    return new Observable<Response>(subscriber => {
      const response = endpoint.bind(this.autograderClient)(request, this.messageCallback(subscriber));
      return response.cancel;
    });
  }

  login(username: string, password: string) {
    const request = new LoginRequest();
    request.setUsername(username);
    request.setPassword(password);
    return this.unary(this.autograderClient.login, request);
  }

  getCourseList(userId: number) {
    const request = new GetCourseListRequest();
    request.setUserId(userId);
    return this.unary(this.autograderClient.getCourseList, request);
  }

  getAssignmentsInCourse(courseId: number) {
    const request = new GetAssignmentsInCourseRequest();
    request.setCourseId(courseId);
    return this.unary(this.autograderClient.getAssignmentsInCourse, request);
  }

  getSubmissionsInAssignment(courseId: number, assignmentId: number) {
    const request = new GetSubmissionsInAssignmentRequest();
    request.setAssignmentId(assignmentId);
    request.setUserId(1);
    return this.unary(this.autograderClient.getSubmissionsInAssignment, request);
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
    return this.unary(this.autograderClient.initUpload, request);
  }

  createManifest(userId: number, assignmentId: number) {
    const request = new CreateManifestRequest();
    request.setUserId(userId);
    request.setAssignmentId(assignmentId);
    return this.unary(this.autograderClient.createManifest, request);
  }

  createSubmission(userId: number, assigmentId: number, manifestId: number, submitters: number[]) {
    const request = new CreateSubmissionRequest();
    request.setUserId(userId);
    request.setSubmittersList(submitters);
    request.setManifestId(manifestId);
    request.setAssignmentId(assigmentId);
    return this.unary(this.autograderClient.createSubmission, request);
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
    return this.unary(this.autograderClient.getSubmissionReport, request);
  }

  getAssignment(assignmentId: number) {
    const request = new GetAssignmentRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(this.autograderClient.getAssignment, request);
  }

  getCourse(courseId: number) {
    const request = new GetCourseRequest();
    request.setCourseId(courseId);
    return this.unary(this.autograderClient.getCourse, request);
  }
}
