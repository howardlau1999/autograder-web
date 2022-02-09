import {Injectable} from '@angular/core';
import {AutograderService, ServiceError, UnaryResponse} from "./proto/api_pb_service";
import {
  CreateAssignmentRequest,
  CreateCourseRequest,
  CreateManifestRequest,
  CreateSubmissionRequest,
  GetAssignmentRequest,
  GetAssignmentsInCourseRequest,
  GetCourseListRequest,
  GetCourseRequest,
  GetFilesInSubmissionRequest,
  GetLeaderboardRequest,
  GetSubmissionReportRequest,
  GetSubmissionsInAssignmentRequest,
  InitDownloadRequest,
  InitUploadRequest,
  LoginRequest,
  SubscribeSubmissionRequest,
  SubscribeSubmissionResponse,
} from "./proto/api_pb";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DateTime} from "luxon";
import {AssignmentType, ProgrammingAssignmentConfig} from "./proto/model_pb";
import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";
import {environment} from "../../environments/environment";
import {TokenService} from "../service/token.service";
import {grpc} from "@improbable-eng/grpc-web";
import UnaryMethodDefinition = grpc.UnaryMethodDefinition;
import ProtobufMessage = grpc.ProtobufMessage;
import UnaryOutput = grpc.UnaryOutput;


type UnaryCallback<Response> = (err: ServiceError | null, response: Response | null) => void;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host = environment.serverHost;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  private unary<Request extends ProtobufMessage, Response extends ProtobufMessage>(
    method: UnaryMethodDefinition<Request, Response>,
    request: Request
  ): Observable<Response> {
    return new Observable<Response>(subscriber => {
      grpc.unary(method, {
        host: this.host,
        debug: !environment.production,
        metadata: new grpc.Metadata({
          'authorization': `bearer ${this.tokenService.getToken()}`,
        }),
        onEnd: (output: UnaryOutput<Response>) => {
          if (output.status !== grpc.Code.OK || output.message === null) {
            subscriber.error(output.statusMessage);
            return;
          }
          if (output.headers.has("token")) {
            this.tokenService.setToken(output.headers.get("token")[0]);
          }
          subscriber.next(output.message);
          subscriber.complete();
        },
        request,
      });
    });
  }

  login(username: string, password: string) {
    const request = new LoginRequest();
    request.setUsername(username);
    request.setPassword(password);
    return this.unary(AutograderService.Login, request);
  }

  getCourseList() {
    const request = new GetCourseListRequest();
    return this.unary(AutograderService.GetCourseList, request);
  }

  getAssignmentsInCourse(courseId: number) {
    const request = new GetAssignmentsInCourseRequest();
    request.setCourseId(courseId);
    return this.unary(AutograderService.GetAssignmentsInCourse, request);
  }

  getSubmissionsInAssignment(courseId: number, assignmentId: number) {
    const request = new GetSubmissionsInAssignmentRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.GetSubmissionsInAssignment, request);
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
    return this.unary(AutograderService.InitUpload, request);
  }

  createManifest(assignmentId: number) {
    const request = new CreateManifestRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.CreateManifest, request);
  }

  createSubmission(assigmentId: number, manifestId: number, submitters: number[], nickname: string) {
    const request = new CreateSubmissionRequest();
    request.setSubmittersList(submitters);
    request.setManifestId(manifestId);
    request.setAssignmentId(assigmentId);
    request.setLeaderboardName(nickname);
    return this.unary(AutograderService.CreateSubmission, request);
  }

  subscribeSubmission(submissionId: number) {
    const request = new SubscribeSubmissionRequest();
    request.setSubmissionId(submissionId);
    return new Observable<SubscribeSubmissionResponse>(subscriber => {
      return grpc.invoke(AutograderService.SubscribeSubmission, {
        host: this.host,
        onHeaders: (headers: grpc.Metadata) => {
          if (headers.has("token")) {
            this.tokenService.setToken(headers.get("token")[0]);
          }
        },
        onMessage: (message: SubscribeSubmissionResponse) => {
          subscriber.next(message);
        },
        onEnd: (code, message, trailers) => {
          if (code !== grpc.Code.OK) {
            subscriber.error(message);
            return;
          }
          subscriber.complete();
        },
        request,
      }).close;
    });
  }

  getSubmissionReport(submissionId: number) {
    const request = new GetSubmissionReportRequest();
    request.setSubmissionId(submissionId);
    return this.unary(AutograderService.GetSubmissionReport, request);
  }

  getAssignment(assignmentId: number) {
    const request = new GetAssignmentRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.GetAssignment, request);
  }

  getCourse(courseId: number) {
    const request = new GetCourseRequest();
    request.setCourseId(courseId);
    return this.unary(AutograderService.GetCourse, request);
  }

  getFilesInSubmission(submissionId: number) {
    const request = new GetFilesInSubmissionRequest();
    request.setSubmissionId(submissionId);
    return this.unary(AutograderService.GetFilesInSubmission, request);
  }

  getLeaderboard(assignmentId: number) {
    const request = new GetLeaderboardRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.GetLeaderboard, request);
  }

  createCourse(name: string, shortName: string, description: string) {
    const request = new CreateCourseRequest();
    request.setUserId(1);
    request.setName(name);
    request.setShortName(shortName);
    request.setDescription(description);
    return this.unary(AutograderService.CreateCourse, request);
  }

  createProgrammingAssignment(courseId: number, name: string, releaseDate: DateTime, dueDate: DateTime, description: string, dockerImage: string) {
    const request = new CreateAssignmentRequest();
    const programmingConfig = new ProgrammingAssignmentConfig();
    request.setAssignmentType(AssignmentType.PROGRAMMING);
    request.setCourseId(courseId);
    request.setName(name);
    request.setDescription(description);
    request.setReleaseDate(Timestamp.fromDate(releaseDate.toJSDate()));
    request.setDueDate(Timestamp.fromDate(dueDate.toJSDate()));
    programmingConfig.setImage(dockerImage);
    request.setProgrammingConfig(programmingConfig);
    return this.unary(AutograderService.CreateAssignment, request);
  }

  initDownload(submissionId: number, filename: string) {
    const request = new InitDownloadRequest();
    request.setFilename(filename);
    request.setSubmissionId(submissionId);
    return this.unary(AutograderService.InitDownload, request);
  }
}
