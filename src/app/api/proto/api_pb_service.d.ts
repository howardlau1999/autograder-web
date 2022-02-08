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

type AutograderServiceSubscribeSubmissions = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.SubscribeSubmissionsRequest;
  readonly responseType: typeof api_pb.SubscribeSubmissionsResponse;
};

type AutograderServiceSubscribeSubmission = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.SubscribeSubmissionRequest;
  readonly responseType: typeof api_pb.SubscribeSubmissionResponse;
};

type AutograderServiceStreamSubmissionLog = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.StreamSubmissionLogRequest;
  readonly responseType: typeof api_pb.ChunkResponse;
};

type AutograderServiceGetFile = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_pb.GetFileRequest;
  readonly responseType: typeof api_pb.ChunkResponse;
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

export class AutograderService {
  static readonly serviceName: string;
  static readonly Login: AutograderServiceLogin;
  static readonly GetCourseList: AutograderServiceGetCourseList;
  static readonly GetAssignmentsInCourse: AutograderServiceGetAssignmentsInCourse;
  static readonly GetSubmissionsInAssignment: AutograderServiceGetSubmissionsInAssignment;
  static readonly SubscribeSubmissions: AutograderServiceSubscribeSubmissions;
  static readonly SubscribeSubmission: AutograderServiceSubscribeSubmission;
  static readonly StreamSubmissionLog: AutograderServiceStreamSubmissionLog;
  static readonly GetFile: AutograderServiceGetFile;
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
  subscribeSubmissions(requestMessage: api_pb.SubscribeSubmissionsRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.SubscribeSubmissionsResponse>;
  subscribeSubmission(requestMessage: api_pb.SubscribeSubmissionRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.SubscribeSubmissionResponse>;
  streamSubmissionLog(requestMessage: api_pb.StreamSubmissionLogRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.ChunkResponse>;
  getFile(requestMessage: api_pb.GetFileRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.ChunkResponse>;
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
}

