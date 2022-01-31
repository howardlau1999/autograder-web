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

type AutograderServiceGetSubmissionDetails = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_pb.GetSubmissionDetailsRequest;
  readonly responseType: typeof api_pb.GetSubmissionDetailsResponse;
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

export class AutograderService {
  static readonly serviceName: string;
  static readonly Login: AutograderServiceLogin;
  static readonly GetCourseList: AutograderServiceGetCourseList;
  static readonly GetAssignmentsInCourse: AutograderServiceGetAssignmentsInCourse;
  static readonly GetSubmissionsInAssignment: AutograderServiceGetSubmissionsInAssignment;
  static readonly SubscribeSubmissions: AutograderServiceSubscribeSubmissions;
  static readonly StreamSubmissionLog: AutograderServiceStreamSubmissionLog;
  static readonly GetFile: AutograderServiceGetFile;
  static readonly GetSubmissionDetails: AutograderServiceGetSubmissionDetails;
  static readonly CreateManifest: AutograderServiceCreateManifest;
  static readonly CreateSubmission: AutograderServiceCreateSubmission;
  static readonly InitUpload: AutograderServiceInitUpload;
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
  streamSubmissionLog(requestMessage: api_pb.StreamSubmissionLogRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.ChunkResponse>;
  getFile(requestMessage: api_pb.GetFileRequest, metadata?: grpc.Metadata): ResponseStream<api_pb.ChunkResponse>;
  getSubmissionDetails(
    requestMessage: api_pb.GetSubmissionDetailsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetSubmissionDetailsResponse|null) => void
  ): UnaryResponse;
  getSubmissionDetails(
    requestMessage: api_pb.GetSubmissionDetailsRequest,
    callback: (error: ServiceError|null, responseMessage: api_pb.GetSubmissionDetailsResponse|null) => void
  ): UnaryResponse;
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
}

