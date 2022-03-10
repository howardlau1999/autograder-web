import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { grpc } from '@improbable-eng/grpc-web';
import { AutograderService } from './proto/api_pb_service';
import {
  ActivateSubmissionRequest,
  AddCourseMembersRequest,
  BindGithubRequest,
  CancelSubmissionRequest,
  CanWriteCourseRequest,
  ChangeAllowsJoinCourseRequest,
  ChangeLeaderboardAnonymousRequest,
  CreateAssignmentRequest,
  CreateCourseRequest,
  CreateManifestRequest,
  CreateSubmissionRequest,
  DeleteFileInManifestRequest,
  DeleteLeaderboardRequest,
  ExportAssignmentGradesRequest,
  GenerateJoinCodeRequest,
  GetAllGradersRequest,
  GetAllUsersRequest,
  GetAssignmentRequest,
  GetAssignmentsInCourseRequest,
  GetCourseListRequest,
  GetCourseMembersRequest,
  GetCourseRequest,
  GetFilesInSubmissionRequest,
  GetLeaderboardRequest,
  GetSubmissionReportRequest,
  GetSubmissionsInAssignmentRequest,
  GetUserRequest,
  GithubLoginRequest,
  HasLeaderboardRequest,
  InitDownloadRequest,
  InitUploadRequest,
  InspectAllSubmissionsInAssignmentRequest,
  InspectUserSubmissionHistoryRequest,
  JoinCourseRequest,
  LoginRequest,
  RegradeAssignmentRequest,
  RegradeSubmissionRequest,
  RemoveCourseMembersRequest,
  RequestPasswordResetRequest,
  RequestSignUpTokenRequest,
  ResetPasswordRequest,
  SetAdminRequest,
  SignUpRequest,
  SubscribeSubmissionRequest,
  UnbindGithubRequest,
  UpdateAssignmentRequest,
  UpdateCourseMemberRequest,
  UpdateCourseRequest,
  UpdatePasswordRequest,
  UpdateUserRequest,
  WebStreamLogRequest,
} from './proto/api_pb';
import {
  Assignment,
  AssignmentType,
  CourseMember,
  CourseRoleMap,
  ProgrammingAssignmentConfig,
  SubmissionLimitConfig,
} from './proto/model_pb';
import { environment } from '../../environments/environment';
import { TokenService } from '../service/token.service';
import { ErrorService } from '../service/error.service';
import UnaryMethodDefinition = grpc.UnaryMethodDefinition;
import ProtobufMessage = grpc.ProtobufMessage;
import UnaryOutput = grpc.UnaryOutput;
import MethodDefinition = grpc.MethodDefinition;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  host = environment.serverHost;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private errorService: ErrorService,
  ) {}

  private serverStream<Request extends ProtobufMessage, Response extends ProtobufMessage>(
    method: MethodDefinition<Request, Response>,
    request: Request,
  ) {
    return new Observable<Response>((subscriber) => {
      return grpc.invoke(method, {
        host: this.host || window.location.origin,
        transport: grpc.WebsocketTransport(),
        metadata: new grpc.Metadata({
          authorization: `bearer ${this.tokenService.getToken()}`,
        }),
        onHeaders: (headers: grpc.Metadata) => {
          if (headers.has('token')) {
            this.tokenService.setToken(headers.get('token')[0]);
          }
        },
        onMessage: (message: Response) => {
          if (!environment.production) {
            console.log(message);
          }
          subscriber.next(message);
        },
        onEnd: (code, message) => {
          if (code !== grpc.Code.OK) {
            if (!environment.production) {
              console.log(code, message);
            }
            subscriber.error({ status: code, message });
            return;
          }
          subscriber.complete();
        },
        request,
      }).close;
    });
  }

  private unary<Request extends ProtobufMessage, Response extends ProtobufMessage>(
    method: UnaryMethodDefinition<Request, Response>,
    request: Request,
  ) {
    return new Observable<Response>((subscriber) => {
      return grpc.unary(method, {
        host: this.host,
        debug: !environment.production,
        metadata: new grpc.Metadata({
          authorization: `bearer ${this.tokenService.getToken()}`,
        }),
        onEnd: (output: UnaryOutput<Response>) => {
          if (!environment.production) {
            console.log(output);
          }
          if (output.status !== grpc.Code.OK || output.message === null) {
            if (output.status === grpc.Code.Unknown) {
              this.errorService.handleUnknownError(output.statusMessage);
            }
            if (
              output.status === grpc.Code.Unauthenticated &&
              output.statusMessage === 'INVALID_TOKEN'
            ) {
              this.tokenService.logout();
              this.errorService.handleInvalidToken();
              subscriber.complete();
              return;
            }
            subscriber.error({ status: output.status, message: output.statusMessage });
            return;
          }
          if (output.headers.has('token')) {
            this.tokenService.setToken(output.headers.get('token')[0]);
          }
          subscriber.next(output.message);
          subscriber.complete();
        },
        request,
      }).close;
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

  getSubmissionsInAssignment(assignmentId: number) {
    const request = new GetSubmissionsInAssignmentRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.GetSubmissionsInAssignment, request);
  }

  uploadFile(file: Blob, uploadToken: string) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.host}/AutograderService/FileUpload`, formData, {
      reportProgress: true,
      observe: 'events',
      headers: {
        'Upload-token': uploadToken,
      },
    });
  }

  initUpload(filename: string, manifestId: number, filesize: number) {
    const request = new InitUploadRequest();
    request.setFilename(filename);
    request.setManifestId(manifestId);
    request.setFilesize(filesize);
    return this.unary(AutograderService.InitUpload, request);
  }

  createManifest(assignmentId: number) {
    const request = new CreateManifestRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.CreateManifest, request);
  }

  createSubmission(
    assigmentId: number,
    manifestId: number,
    submitters: number[],
    nickname: string,
  ) {
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
    return this.serverStream(AutograderService.SubscribeSubmission, request);
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
    request.setName(name);
    request.setShortName(shortName);
    request.setDescription(description);
    return this.unary(AutograderService.CreateCourse, request);
  }

  createProgrammingAssignment(
    courseId: number,
    name: string,
    releaseDate: DateTime,
    dueDate: DateTime,
    description: string,
    dockerImage: string,
    tags: string[],
    cpu: number,
    memory: number,
    timeout: number,
    submissionLimit: SubmissionLimitConfig,
    uploadLimit: number,
  ) {
    const request = new CreateAssignmentRequest();
    const programmingConfig = new ProgrammingAssignmentConfig();
    request.setAssignmentType(AssignmentType.PROGRAMMING);
    request.setCourseId(courseId);
    request.setName(name);
    request.setDescription(description);
    request.setReleaseDate(Timestamp.fromDate(releaseDate.toJSDate()));
    request.setDueDate(Timestamp.fromDate(dueDate.toJSDate()));
    programmingConfig.setImage(dockerImage);
    programmingConfig.setCpu(cpu);
    programmingConfig.setMemory(memory);
    programmingConfig.setTagsList(tags);
    programmingConfig.setTimeout(timeout);
    request.setProgrammingConfig(programmingConfig);
    request.setSubmissionLimit(submissionLimit);
    request.setUploadLimit(uploadLimit);
    return this.unary(AutograderService.CreateAssignment, request);
  }

  initDownload(
    submissionId: number,
    filename: string,
    isDirectory: boolean = false,
    isOutput: boolean = false,
  ) {
    const request = new InitDownloadRequest();
    request.setFilename(filename);
    request.setSubmissionId(submissionId);
    request.setIsDirectory(isDirectory);
    request.setIsOutput(isOutput);
    return this.unary(AutograderService.InitDownload, request);
  }

  deleteFileInManifest(manifestId: number, filename: string) {
    const request = new DeleteFileInManifestRequest();
    request.setManifestId(manifestId);
    request.setFilename(filename);
    return this.unary(AutograderService.DeleteFileInManifest, request);
  }

  getCourseMembers(courseId: number) {
    const request = new GetCourseMembersRequest();
    request.setCourseId(courseId);
    return this.unary(AutograderService.GetCourseMembers, request);
  }

  addCourseMembers(courseId: number, members: AddCourseMembersRequest.MemberToAdd[]) {
    const request = new AddCourseMembersRequest();
    request.setCourseId(courseId);
    request.setMembersList(members);
    return this.unary(AutograderService.AddCourseMembers, request);
  }

  removeCourseMembers(courseId: number, userIds: number[]) {
    const request = new RemoveCourseMembersRequest();
    request.setCourseId(courseId);
    request.setUserIdsList(userIds);
    return this.unary(AutograderService.RemoveCourseMembers, request);
  }

  updateCourseMember(courseId: number, userId: number, role: CourseRoleMap[keyof CourseRoleMap]) {
    const request = new UpdateCourseMemberRequest();
    request.setCourseId(courseId);
    const member = new CourseMember();
    member.setCourseId(courseId);
    member.setUserId(userId);
    member.setRole(role);
    request.setMember(member);
    return this.unary(AutograderService.UpdateCourseMember, request);
  }

  updateCourse(courseId: number, name: string, shortName: string, description: string) {
    const request = new UpdateCourseRequest();
    request.setCourseId(courseId);
    request.setName(name);
    request.setShortName(shortName);
    request.setDescription(description);
    return this.unary(AutograderService.UpdateCourse, request);
  }

  updateAssignment(assignmentId: number, assignment: Assignment) {
    const request = new UpdateAssignmentRequest();
    request.setAssignmentId(assignmentId);
    request.setAssignment(assignment);
    return this.unary(AutograderService.UpdateAssignment, request);
  }

  requestPasswordReset(email: string, captcha: string) {
    const request = new RequestPasswordResetRequest();
    request.setEmail(email);
    request.setCaptcha(captcha);
    return this.unary(AutograderService.RequestPasswordReset, request);
  }

  resetPassword(email: string, code: string, password: string) {
    const request = new ResetPasswordRequest();
    request.setEmail(email);
    request.setCode(code);
    request.setPassword(password);
    return this.unary(AutograderService.ResetPassword, request);
  }

  requestSignUpToken(username: string, email: string, captcha: string) {
    const request = new RequestSignUpTokenRequest();
    request.setUsername(username);
    request.setEmail(email);
    request.setCaptcha(captcha);
    return this.unary(AutograderService.RequestSignUpToken, request);
  }

  signUp(username: string, email: string, code: string, password: string) {
    const request = new SignUpRequest();
    request.setUsername(username);
    request.setEmail(email);
    request.setCode(code);
    request.setPassword(password);
    return this.unary(AutograderService.SignUp, request);
  }

  canWriteCourse(courseId: number) {
    const request = new CanWriteCourseRequest();
    request.setCourseId(courseId);
    return this.unary(AutograderService.CanWriteCourse, request);
  }

  hasLeaderboard(assignmentId: number) {
    const request = new HasLeaderboardRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.HasLeaderboard, request);
  }

  githubLogin(code: string) {
    const request = new GithubLoginRequest();
    request.setCode(code);
    return this.unary(AutograderService.GithubLogin, request);
  }

  bindGithub(code: string) {
    const request = new BindGithubRequest();
    request.setCode(code);
    return this.unary(AutograderService.BindGithub, request);
  }

  unbindGithub() {
    const request = new UnbindGithubRequest();
    return this.unary(AutograderService.UnbindGithub, request);
  }

  getUser() {
    const request = new GetUserRequest();
    return this.unary(AutograderService.GetUser, request);
  }

  updateUser(nickname: string, studentId: string) {
    const request = new UpdateUserRequest();
    request.setNickname(nickname);
    request.setStudentId(studentId);
    return this.unary(AutograderService.UpdateUser, request);
  }

  updatePassword(oldPassword: string, newPassword: string) {
    const request = new UpdatePasswordRequest();
    request.setOldPassword(oldPassword);
    request.setNewPassword(newPassword);
    return this.unary(AutograderService.UpdatePassword, request);
  }

  joinCourse(code: string) {
    const request = new JoinCourseRequest();
    request.setJoinCode(code);
    return this.unary(AutograderService.JoinCourse, request);
  }

  generateJoinCode(courseId: number) {
    const request = new GenerateJoinCodeRequest();
    request.setCourseId(courseId);
    return this.unary(AutograderService.GenerateJoinCode, request);
  }

  changeAllowsJoinCourse(courseId: number, allowsJoin: boolean) {
    const request = new ChangeAllowsJoinCourseRequest();
    request.setCourseId(courseId);
    request.setAllowsJoin(allowsJoin);
    return this.unary(AutograderService.ChangeAllowsJoinCourse, request);
  }

  inspectAllSubmissionsInAssignment(assignmentId: number) {
    const request = new InspectAllSubmissionsInAssignmentRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.InspectAllSubmissionsInAssignment, request);
  }

  inspectUserSubmissionHistory(userId: number, assignmentId: number) {
    const request = new InspectUserSubmissionHistoryRequest();
    request.setUserId(userId);
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.InspectUserSubmissionHistory, request);
  }

  activateSubmission(submissionId: number) {
    const request = new ActivateSubmissionRequest();
    request.setSubmissionId(submissionId);
    return this.unary(AutograderService.ActivateSubmission, request);
  }

  regradeSubmission(submissionId: number) {
    const request = new RegradeSubmissionRequest();
    request.setSubmissionId(submissionId);
    return this.unary(AutograderService.RegradeSubmission, request);
  }

  regradeAssignment(assignmentId: number) {
    const request = new RegradeAssignmentRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.RegradeAssignment, request);
  }

  changeLeaderboardAnonymous(assignmentId: number, anonymous: boolean) {
    const request = new ChangeLeaderboardAnonymousRequest();
    request.setAssignmentId(assignmentId);
    request.setAnonymous(anonymous);
    return this.unary(AutograderService.ChangeLeaderboardAnonymous, request);
  }

  exportAssignmentGrades(assignmentId: number) {
    const request = new ExportAssignmentGradesRequest();
    request.setAssignmentId(assignmentId);
    return this.unary(AutograderService.ExportAssignmentGrades, request);
  }

  getAllGraders() {
    const request = new GetAllGradersRequest();
    return this.unary(AutograderService.GetAllGraders, request);
  }

  cancelSubmission(submissionId: number) {
    const request = new CancelSubmissionRequest();
    request.setSubmissionId(submissionId);
    return this.unary(AutograderService.CancelSubmission, request);
  }

  deleteLeaderboard(assignmentId: number, userId: number) {
    const request = new DeleteLeaderboardRequest();
    request.setAssignmentId(assignmentId);
    request.setUserId(userId);
    return this.unary(AutograderService.DeleteLeaderboard, request);
  }

  getAllUsers() {
    const request = new GetAllUsersRequest();
    return this.unary(AutograderService.GetAllUsers, request);
  }

  setAdmin(userId: number, isAdmin: boolean) {
    const request = new SetAdminRequest();
    request.setUserId(userId);
    request.setIsAdmin(isAdmin);
    return this.unary(AutograderService.SetAdmin, request);
  }

  streamLog(submissionId: number) {
    const request = new WebStreamLogRequest();
    request.setSubmissionId(submissionId);
    return this.serverStream(AutograderService.StreamLog, request);
  }
}
