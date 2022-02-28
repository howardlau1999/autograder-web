// package: 
// file: api.proto

import * as api_pb from "./api_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AutograderServiceLogin = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.LoginRequest;
  readonly responseType: typeof api_pb.LoginResponse;
};

type AutograderServiceGetCourseList = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetCourseListRequest;
  readonly responseType: typeof api_pb.GetCourseListResponse;
};

type AutograderServiceGetAssignmentsInCourse = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetAssignmentsInCourseRequest;
  readonly responseType: typeof api_pb.GetAssignmentsInCourseResponse;
};

type AutograderServiceGetSubmissionsInAssignment = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetSubmissionsInAssignmentRequest;
  readonly responseType: typeof api_pb.GetSubmissionsInAssignmentResponse;
};

type AutograderServiceSubscribeSubmission = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.SubscribeSubmissionRequest;
  readonly responseType: typeof api_pb.SubscribeSubmissionResponse;
};

type AutograderServiceCreateManifest = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CreateManifestRequest;
  readonly responseType: typeof api_pb.CreateManifestResponse;
};

type AutograderServiceCreateSubmission = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CreateSubmissionRequest;
  readonly responseType: typeof api_pb.CreateSubmissionResponse;
};

type AutograderServiceInitUpload = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.InitUploadRequest;
  readonly responseType: typeof api_pb.InitUploadResponse;
};

type AutograderServiceGetSubmissionReport = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetSubmissionReportRequest;
  readonly responseType: typeof api_pb.GetSubmissionReportResponse;
};

type AutograderServiceGetAssignment = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetAssignmentRequest;
  readonly responseType: typeof api_pb.GetAssignmentResponse;
};

type AutograderServiceGetCourse = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetCourseRequest;
  readonly responseType: typeof api_pb.GetCourseResponse;
};

type AutograderServiceCreateCourse = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CreateCourseRequest;
  readonly responseType: typeof api_pb.CreateCourseResponse;
};

type AutograderServiceGetFilesInSubmission = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetFilesInSubmissionRequest;
  readonly responseType: typeof api_pb.GetFilesInSubmissionResponse;
};

type AutograderServiceGetLeaderboard = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetLeaderboardRequest;
  readonly responseType: typeof api_pb.GetLeaderboardResponse;
};

type AutograderServiceHasLeaderboard = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.HasLeaderboardRequest;
  readonly responseType: typeof api_pb.HasLeaderboardResponse;
};

type AutograderServiceCreateAssignment = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CreateAssignmentRequest;
  readonly responseType: typeof api_pb.CreateAssignmentResponse;
};

type AutograderServiceDeleteFileInManifest = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.DeleteFileInManifestRequest;
  readonly responseType: typeof api_pb.DeleteFileInManifestResponse;
};

type AutograderServiceInitDownload = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.InitDownloadRequest;
  readonly responseType: typeof api_pb.InitDownloadResponse;
};

type AutograderServiceGetCourseMembers = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetCourseMembersRequest;
  readonly responseType: typeof api_pb.GetCourseMembersResponse;
};

type AutograderServiceAddCourseMembers = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.AddCourseMembersRequest;
  readonly responseType: typeof api_pb.AddCourseMembersResponse;
};

type AutograderServiceRemoveCourseMembers = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.RemoveCourseMembersRequest;
  readonly responseType: typeof api_pb.RemoveCourseMembersResponse;
};

type AutograderServiceUpdateCourseMember = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.UpdateCourseMemberRequest;
  readonly responseType: typeof api_pb.UpdateCourseMemberResponse;
};

type AutograderServiceUpdateCourse = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.UpdateCourseRequest;
  readonly responseType: typeof api_pb.UpdateCourseResponse;
};

type AutograderServiceUpdateAssignment = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.UpdateAssignmentRequest;
  readonly responseType: typeof api_pb.UpdateAssignmentResponse;
};

type AutograderServiceRequestPasswordReset = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.RequestPasswordResetRequest;
  readonly responseType: typeof api_pb.RequestPasswordResetResponse;
};

type AutograderServiceResetPassword = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ResetPasswordRequest;
  readonly responseType: typeof api_pb.ResetPasswordResponse;
};

type AutograderServiceRequestSignUpToken = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.RequestSignUpTokenRequest;
  readonly responseType: typeof api_pb.RequestSignUpTokenResponse;
};

type AutograderServiceSignUp = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.SignUpRequest;
  readonly responseType: typeof api_pb.SignUpResponse;
};

type AutograderServiceCanWriteCourse = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.CanWriteCourseRequest;
  readonly responseType: typeof api_pb.CanWriteCourseResponse;
};

type AutograderServiceGithubLogin = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GithubLoginRequest;
  readonly responseType: typeof api_pb.GithubLoginResponse;
};

type AutograderServiceGetUser = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetUserRequest;
  readonly responseType: typeof api_pb.GetUserResponse;
};

type AutograderServiceBindGithub = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.BindGithubRequest;
  readonly responseType: typeof api_pb.BindGithubResponse;
};

type AutograderServiceUnbindGithub = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.UnbindGithubRequest;
  readonly responseType: typeof api_pb.UnbindGithubResponse;
};

type AutograderServiceUpdateUser = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.UpdateUserRequest;
  readonly responseType: typeof api_pb.UpdateUserResponse;
};

type AutograderServiceUpdatePassword = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.UpdatePasswordRequest;
  readonly responseType: typeof api_pb.UpdatePasswordResponse;
};

type AutograderServiceJoinCourse = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.JoinCourseRequest;
  readonly responseType: typeof api_pb.JoinCourseResponse;
};

type AutograderServiceGenerateJoinCode = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GenerateJoinCodeRequest;
  readonly responseType: typeof api_pb.GenerateJoinCodeResponse;
};

type AutograderServiceChangeAllowsJoinCourse = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ChangeAllowsJoinCourseRequest;
  readonly responseType: typeof api_pb.ChangeAllowsJoinCourseResponse;
};

type AutograderServiceInspectAllSubmissionsInAssignment = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.InspectAllSubmissionsInAssignmentRequest;
  readonly responseType: typeof api_pb.InspectAllSubmissionsInAssignmentResponse;
};

type AutograderServiceInspectUserSubmissionHistory = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.InspectUserSubmissionHistoryRequest;
  readonly responseType: typeof api_pb.InspectUserSubmissionHistoryResponse;
};

type AutograderServiceActivateSubmission = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ActivateSubmissionRequest;
  readonly responseType: typeof api_pb.ActivateSubmissionResponse;
};

type AutograderServiceRegradeSubmission = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.RegradeSubmissionRequest;
  readonly responseType: typeof api_pb.RegradeSubmissionResponse;
};

type AutograderServiceRegradeAssignment = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.RegradeAssignmentRequest;
  readonly responseType: typeof api_pb.RegradeAssignmentResponse;
};

type AutograderServiceChangeLeaderboardAnonymous = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ChangeLeaderboardAnonymousRequest;
  readonly responseType: typeof api_pb.ChangeLeaderboardAnonymousResponse;
};

type AutograderServiceExportAssignmentGrades = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.ExportAssignmentGradesRequest;
  readonly responseType: typeof api_pb.ExportAssignmentGradesResponse;
};

type AutograderServiceRemoveGrader = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.RemoveGraderRequest;
  readonly responseType: typeof api_pb.RemoveGraderResponse;
};

type AutograderServiceGetAllGraders = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetAllGradersRequest;
  readonly responseType: typeof api_pb.GetAllGradersResponse;
};

export class AutograderService {
  static readonly serviceName: string;
  static readonly Login: AutograderServiceLogin;
  static readonly GetCourseList: AutograderServiceGetCourseList;
  static readonly GetAssignmentsInCourse: AutograderServiceGetAssignmentsInCourse;
  static readonly GetSubmissionsInAssignment: AutograderServiceGetSubmissionsInAssignment;
  static readonly SubscribeSubmission: AutograderServiceSubscribeSubmission;
  static readonly CreateManifest: AutograderServiceCreateManifest;
  static readonly CreateSubmission: AutograderServiceCreateSubmission;
  static readonly InitUpload: AutograderServiceInitUpload;
  static readonly GetSubmissionReport: AutograderServiceGetSubmissionReport;
  static readonly GetAssignment: AutograderServiceGetAssignment;
  static readonly GetCourse: AutograderServiceGetCourse;
  static readonly CreateCourse: AutograderServiceCreateCourse;
  static readonly GetFilesInSubmission: AutograderServiceGetFilesInSubmission;
  static readonly GetLeaderboard: AutograderServiceGetLeaderboard;
  static readonly HasLeaderboard: AutograderServiceHasLeaderboard;
  static readonly CreateAssignment: AutograderServiceCreateAssignment;
  static readonly DeleteFileInManifest: AutograderServiceDeleteFileInManifest;
  static readonly InitDownload: AutograderServiceInitDownload;
  static readonly GetCourseMembers: AutograderServiceGetCourseMembers;
  static readonly AddCourseMembers: AutograderServiceAddCourseMembers;
  static readonly RemoveCourseMembers: AutograderServiceRemoveCourseMembers;
  static readonly UpdateCourseMember: AutograderServiceUpdateCourseMember;
  static readonly UpdateCourse: AutograderServiceUpdateCourse;
  static readonly UpdateAssignment: AutograderServiceUpdateAssignment;
  static readonly RequestPasswordReset: AutograderServiceRequestPasswordReset;
  static readonly ResetPassword: AutograderServiceResetPassword;
  static readonly RequestSignUpToken: AutograderServiceRequestSignUpToken;
  static readonly SignUp: AutograderServiceSignUp;
  static readonly CanWriteCourse: AutograderServiceCanWriteCourse;
  static readonly GithubLogin: AutograderServiceGithubLogin;
  static readonly GetUser: AutograderServiceGetUser;
  static readonly BindGithub: AutograderServiceBindGithub;
  static readonly UnbindGithub: AutograderServiceUnbindGithub;
  static readonly UpdateUser: AutograderServiceUpdateUser;
  static readonly UpdatePassword: AutograderServiceUpdatePassword;
  static readonly JoinCourse: AutograderServiceJoinCourse;
  static readonly GenerateJoinCode: AutograderServiceGenerateJoinCode;
  static readonly ChangeAllowsJoinCourse: AutograderServiceChangeAllowsJoinCourse;
  static readonly InspectAllSubmissionsInAssignment: AutograderServiceInspectAllSubmissionsInAssignment;
  static readonly InspectUserSubmissionHistory: AutograderServiceInspectUserSubmissionHistory;
  static readonly ActivateSubmission: AutograderServiceActivateSubmission;
  static readonly RegradeSubmission: AutograderServiceRegradeSubmission;
  static readonly RegradeAssignment: AutograderServiceRegradeAssignment;
  static readonly ChangeLeaderboardAnonymous: AutograderServiceChangeLeaderboardAnonymous;
  static readonly ExportAssignmentGrades: AutograderServiceExportAssignmentGrades;
  static readonly RemoveGrader: AutograderServiceRemoveGrader;
  static readonly GetAllGraders: AutograderServiceGetAllGraders;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class AutograderServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  login(
    requestMessage: api_pb.LoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.LoginResponse|null) => void
  ): UnaryResponse;
  login(
    requestMessage: api_pb.LoginRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.LoginResponse|null) => void
  ): UnaryResponse;
  getCourseList(
    requestMessage: api_pb.GetCourseListRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetCourseListResponse|null) => void
  ): UnaryResponse;
  getCourseList(
    requestMessage: api_pb.GetCourseListRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetCourseListResponse|null) => void
  ): UnaryResponse;
  getAssignmentsInCourse(
    requestMessage: api_pb.GetAssignmentsInCourseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAssignmentsInCourseResponse|null) => void
  ): UnaryResponse;
  getAssignmentsInCourse(
    requestMessage: api_pb.GetAssignmentsInCourseRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAssignmentsInCourseResponse|null) => void
  ): UnaryResponse;
  getSubmissionsInAssignment(
    requestMessage: api_pb.GetSubmissionsInAssignmentRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetSubmissionsInAssignmentResponse|null) => void
  ): UnaryResponse;
  getSubmissionsInAssignment(
    requestMessage: api_pb.GetSubmissionsInAssignmentRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetSubmissionsInAssignmentResponse|null) => void
  ): UnaryResponse;
  subscribeSubmission(requestMessage: api_pb.SubscribeSubmissionRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.SubscribeSubmissionResponse>;
  createManifest(
    requestMessage: api_pb.CreateManifestRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateManifestResponse|null) => void
  ): UnaryResponse;
  createManifest(
    requestMessage: api_pb.CreateManifestRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateManifestResponse|null) => void
  ): UnaryResponse;
  createSubmission(
    requestMessage: api_pb.CreateSubmissionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateSubmissionResponse|null) => void
  ): UnaryResponse;
  createSubmission(
    requestMessage: api_pb.CreateSubmissionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateSubmissionResponse|null) => void
  ): UnaryResponse;
  initUpload(
    requestMessage: api_pb.InitUploadRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.InitUploadResponse|null) => void
  ): UnaryResponse;
  initUpload(
    requestMessage: api_pb.InitUploadRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.InitUploadResponse|null) => void
  ): UnaryResponse;
  getSubmissionReport(
    requestMessage: api_pb.GetSubmissionReportRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetSubmissionReportResponse|null) => void
  ): UnaryResponse;
  getSubmissionReport(
    requestMessage: api_pb.GetSubmissionReportRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetSubmissionReportResponse|null) => void
  ): UnaryResponse;
  getAssignment(
    requestMessage: api_pb.GetAssignmentRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAssignmentResponse|null) => void
  ): UnaryResponse;
  getAssignment(
    requestMessage: api_pb.GetAssignmentRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAssignmentResponse|null) => void
  ): UnaryResponse;
  getCourse(
    requestMessage: api_pb.GetCourseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetCourseResponse|null) => void
  ): UnaryResponse;
  getCourse(
    requestMessage: api_pb.GetCourseRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetCourseResponse|null) => void
  ): UnaryResponse;
  createCourse(
    requestMessage: api_pb.CreateCourseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateCourseResponse|null) => void
  ): UnaryResponse;
  createCourse(
    requestMessage: api_pb.CreateCourseRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateCourseResponse|null) => void
  ): UnaryResponse;
  getFilesInSubmission(
    requestMessage: api_pb.GetFilesInSubmissionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetFilesInSubmissionResponse|null) => void
  ): UnaryResponse;
  getFilesInSubmission(
    requestMessage: api_pb.GetFilesInSubmissionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetFilesInSubmissionResponse|null) => void
  ): UnaryResponse;
  getLeaderboard(
    requestMessage: api_pb.GetLeaderboardRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetLeaderboardResponse|null) => void
  ): UnaryResponse;
  getLeaderboard(
    requestMessage: api_pb.GetLeaderboardRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetLeaderboardResponse|null) => void
  ): UnaryResponse;
  hasLeaderboard(
    requestMessage: api_pb.HasLeaderboardRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.HasLeaderboardResponse|null) => void
  ): UnaryResponse;
  hasLeaderboard(
    requestMessage: api_pb.HasLeaderboardRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.HasLeaderboardResponse|null) => void
  ): UnaryResponse;
  createAssignment(
    requestMessage: api_pb.CreateAssignmentRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateAssignmentResponse|null) => void
  ): UnaryResponse;
  createAssignment(
    requestMessage: api_pb.CreateAssignmentRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CreateAssignmentResponse|null) => void
  ): UnaryResponse;
  deleteFileInManifest(
    requestMessage: api_pb.DeleteFileInManifestRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.DeleteFileInManifestResponse|null) => void
  ): UnaryResponse;
  deleteFileInManifest(
    requestMessage: api_pb.DeleteFileInManifestRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.DeleteFileInManifestResponse|null) => void
  ): UnaryResponse;
  initDownload(
    requestMessage: api_pb.InitDownloadRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.InitDownloadResponse|null) => void
  ): UnaryResponse;
  initDownload(
    requestMessage: api_pb.InitDownloadRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.InitDownloadResponse|null) => void
  ): UnaryResponse;
  getCourseMembers(
    requestMessage: api_pb.GetCourseMembersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetCourseMembersResponse|null) => void
  ): UnaryResponse;
  getCourseMembers(
    requestMessage: api_pb.GetCourseMembersRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetCourseMembersResponse|null) => void
  ): UnaryResponse;
  addCourseMembers(
    requestMessage: api_pb.AddCourseMembersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.AddCourseMembersResponse|null) => void
  ): UnaryResponse;
  addCourseMembers(
    requestMessage: api_pb.AddCourseMembersRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.AddCourseMembersResponse|null) => void
  ): UnaryResponse;
  removeCourseMembers(
    requestMessage: api_pb.RemoveCourseMembersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.RemoveCourseMembersResponse|null) => void
  ): UnaryResponse;
  removeCourseMembers(
    requestMessage: api_pb.RemoveCourseMembersRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.RemoveCourseMembersResponse|null) => void
  ): UnaryResponse;
  updateCourseMember(
    requestMessage: api_pb.UpdateCourseMemberRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdateCourseMemberResponse|null) => void
  ): UnaryResponse;
  updateCourseMember(
    requestMessage: api_pb.UpdateCourseMemberRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdateCourseMemberResponse|null) => void
  ): UnaryResponse;
  updateCourse(
    requestMessage: api_pb.UpdateCourseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdateCourseResponse|null) => void
  ): UnaryResponse;
  updateCourse(
    requestMessage: api_pb.UpdateCourseRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdateCourseResponse|null) => void
  ): UnaryResponse;
  updateAssignment(
    requestMessage: api_pb.UpdateAssignmentRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdateAssignmentResponse|null) => void
  ): UnaryResponse;
  updateAssignment(
    requestMessage: api_pb.UpdateAssignmentRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdateAssignmentResponse|null) => void
  ): UnaryResponse;
  requestPasswordReset(
    requestMessage: api_pb.RequestPasswordResetRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.RequestPasswordResetResponse|null) => void
  ): UnaryResponse;
  requestPasswordReset(
    requestMessage: api_pb.RequestPasswordResetRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.RequestPasswordResetResponse|null) => void
  ): UnaryResponse;
  resetPassword(
    requestMessage: api_pb.ResetPasswordRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ResetPasswordResponse|null) => void
  ): UnaryResponse;
  resetPassword(
    requestMessage: api_pb.ResetPasswordRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ResetPasswordResponse|null) => void
  ): UnaryResponse;
  requestSignUpToken(
    requestMessage: api_pb.RequestSignUpTokenRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.RequestSignUpTokenResponse|null) => void
  ): UnaryResponse;
  requestSignUpToken(
    requestMessage: api_pb.RequestSignUpTokenRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.RequestSignUpTokenResponse|null) => void
  ): UnaryResponse;
  signUp(
    requestMessage: api_pb.SignUpRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignUpResponse|null) => void
  ): UnaryResponse;
  signUp(
    requestMessage: api_pb.SignUpRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.SignUpResponse|null) => void
  ): UnaryResponse;
  canWriteCourse(
    requestMessage: api_pb.CanWriteCourseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.CanWriteCourseResponse|null) => void
  ): UnaryResponse;
  canWriteCourse(
    requestMessage: api_pb.CanWriteCourseRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.CanWriteCourseResponse|null) => void
  ): UnaryResponse;
  githubLogin(
    requestMessage: api_pb.GithubLoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GithubLoginResponse|null) => void
  ): UnaryResponse;
  githubLogin(
    requestMessage: api_pb.GithubLoginRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GithubLoginResponse|null) => void
  ): UnaryResponse;
  getUser(
    requestMessage: api_pb.GetUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetUserResponse|null) => void
  ): UnaryResponse;
  getUser(
    requestMessage: api_pb.GetUserRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetUserResponse|null) => void
  ): UnaryResponse;
  bindGithub(
    requestMessage: api_pb.BindGithubRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.BindGithubResponse|null) => void
  ): UnaryResponse;
  bindGithub(
    requestMessage: api_pb.BindGithubRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.BindGithubResponse|null) => void
  ): UnaryResponse;
  unbindGithub(
    requestMessage: api_pb.UnbindGithubRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.UnbindGithubResponse|null) => void
  ): UnaryResponse;
  unbindGithub(
    requestMessage: api_pb.UnbindGithubRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.UnbindGithubResponse|null) => void
  ): UnaryResponse;
  updateUser(
    requestMessage: api_pb.UpdateUserRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdateUserResponse|null) => void
  ): UnaryResponse;
  updateUser(
    requestMessage: api_pb.UpdateUserRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdateUserResponse|null) => void
  ): UnaryResponse;
  updatePassword(
    requestMessage: api_pb.UpdatePasswordRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdatePasswordResponse|null) => void
  ): UnaryResponse;
  updatePassword(
    requestMessage: api_pb.UpdatePasswordRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.UpdatePasswordResponse|null) => void
  ): UnaryResponse;
  joinCourse(
    requestMessage: api_pb.JoinCourseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.JoinCourseResponse|null) => void
  ): UnaryResponse;
  joinCourse(
    requestMessage: api_pb.JoinCourseRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.JoinCourseResponse|null) => void
  ): UnaryResponse;
  generateJoinCode(
    requestMessage: api_pb.GenerateJoinCodeRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GenerateJoinCodeResponse|null) => void
  ): UnaryResponse;
  generateJoinCode(
    requestMessage: api_pb.GenerateJoinCodeRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GenerateJoinCodeResponse|null) => void
  ): UnaryResponse;
  changeAllowsJoinCourse(
    requestMessage: api_pb.ChangeAllowsJoinCourseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ChangeAllowsJoinCourseResponse|null) => void
  ): UnaryResponse;
  changeAllowsJoinCourse(
    requestMessage: api_pb.ChangeAllowsJoinCourseRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ChangeAllowsJoinCourseResponse|null) => void
  ): UnaryResponse;
  inspectAllSubmissionsInAssignment(
    requestMessage: api_pb.InspectAllSubmissionsInAssignmentRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.InspectAllSubmissionsInAssignmentResponse|null) => void
  ): UnaryResponse;
  inspectAllSubmissionsInAssignment(
    requestMessage: api_pb.InspectAllSubmissionsInAssignmentRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.InspectAllSubmissionsInAssignmentResponse|null) => void
  ): UnaryResponse;
  inspectUserSubmissionHistory(
    requestMessage: api_pb.InspectUserSubmissionHistoryRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.InspectUserSubmissionHistoryResponse|null) => void
  ): UnaryResponse;
  inspectUserSubmissionHistory(
    requestMessage: api_pb.InspectUserSubmissionHistoryRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.InspectUserSubmissionHistoryResponse|null) => void
  ): UnaryResponse;
  activateSubmission(
    requestMessage: api_pb.ActivateSubmissionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ActivateSubmissionResponse|null) => void
  ): UnaryResponse;
  activateSubmission(
    requestMessage: api_pb.ActivateSubmissionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ActivateSubmissionResponse|null) => void
  ): UnaryResponse;
  regradeSubmission(
    requestMessage: api_pb.RegradeSubmissionRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.RegradeSubmissionResponse|null) => void
  ): UnaryResponse;
  regradeSubmission(
    requestMessage: api_pb.RegradeSubmissionRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.RegradeSubmissionResponse|null) => void
  ): UnaryResponse;
  regradeAssignment(
    requestMessage: api_pb.RegradeAssignmentRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.RegradeAssignmentResponse|null) => void
  ): UnaryResponse;
  regradeAssignment(
    requestMessage: api_pb.RegradeAssignmentRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.RegradeAssignmentResponse|null) => void
  ): UnaryResponse;
  changeLeaderboardAnonymous(
    requestMessage: api_pb.ChangeLeaderboardAnonymousRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ChangeLeaderboardAnonymousResponse|null) => void
  ): UnaryResponse;
  changeLeaderboardAnonymous(
    requestMessage: api_pb.ChangeLeaderboardAnonymousRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ChangeLeaderboardAnonymousResponse|null) => void
  ): UnaryResponse;
  exportAssignmentGrades(
    requestMessage: api_pb.ExportAssignmentGradesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.ExportAssignmentGradesResponse|null) => void
  ): UnaryResponse;
  exportAssignmentGrades(
    requestMessage: api_pb.ExportAssignmentGradesRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.ExportAssignmentGradesResponse|null) => void
  ): UnaryResponse;
  removeGrader(
    requestMessage: api_pb.RemoveGraderRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.RemoveGraderResponse|null) => void
  ): UnaryResponse;
  removeGrader(
    requestMessage: api_pb.RemoveGraderRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.RemoveGraderResponse|null) => void
  ): UnaryResponse;
  getAllGraders(
    requestMessage: api_pb.GetAllGradersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAllGradersResponse|null) => void
  ): UnaryResponse;
  getAllGraders(
    requestMessage: api_pb.GetAllGradersRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetAllGradersResponse|null) => void
  ): UnaryResponse;
}

