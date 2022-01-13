// package: 
// file: proto/api.proto

import * as proto_api_pb from "../proto/api_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AutograderServiceLogin = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_api_pb.LoginRequest;
  readonly responseType: typeof proto_api_pb.LoginResponse;
};

type AutograderServiceGetCourseList = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_api_pb.GetCourseListRequest;
  readonly responseType: typeof proto_api_pb.GetCourseListResponse;
};

type AutograderServiceGetAssignmentsInCourse = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_api_pb.GetAssignmentsInCourseRequest;
  readonly responseType: typeof proto_api_pb.GetAssignmentsInCourseResponse;
};

type AutograderServiceGetSubmissionsInAssignment = {
  readonly methodName: string;
  readonly service: typeof AutograderService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_api_pb.GetSubmissionsInAssignmentRequest;
  readonly responseType: typeof proto_api_pb.GetSubmissionsInAssignmentResponse;
};

export class AutograderService {
  static readonly serviceName: string;
  static readonly Login: AutograderServiceLogin;
  static readonly GetCourseList: AutograderServiceGetCourseList;
  static readonly GetAssignmentsInCourse: AutograderServiceGetAssignmentsInCourse;
  static readonly GetSubmissionsInAssignment: AutograderServiceGetSubmissionsInAssignment;
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
    requestMessage: proto_api_pb.LoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_api_pb.LoginResponse|null) => void
  ): UnaryResponse;
  login(
    requestMessage: proto_api_pb.LoginRequest,
    callback: (error: ServiceError|null, responseMessage: proto_api_pb.LoginResponse|null) => void
  ): UnaryResponse;
  getCourseList(
    requestMessage: proto_api_pb.GetCourseListRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_api_pb.GetCourseListResponse|null) => void
  ): UnaryResponse;
  getCourseList(
    requestMessage: proto_api_pb.GetCourseListRequest,
    callback: (error: ServiceError|null, responseMessage: proto_api_pb.GetCourseListResponse|null) => void
  ): UnaryResponse;
  getAssignmentsInCourse(
    requestMessage: proto_api_pb.GetAssignmentsInCourseRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_api_pb.GetAssignmentsInCourseResponse|null) => void
  ): UnaryResponse;
  getAssignmentsInCourse(
    requestMessage: proto_api_pb.GetAssignmentsInCourseRequest,
    callback: (error: ServiceError|null, responseMessage: proto_api_pb.GetAssignmentsInCourseResponse|null) => void
  ): UnaryResponse;
  getSubmissionsInAssignment(
    requestMessage: proto_api_pb.GetSubmissionsInAssignmentRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_api_pb.GetSubmissionsInAssignmentResponse|null) => void
  ): UnaryResponse;
  getSubmissionsInAssignment(
    requestMessage: proto_api_pb.GetSubmissionsInAssignmentRequest,
    callback: (error: ServiceError|null, responseMessage: proto_api_pb.GetSubmissionsInAssignmentResponse|null) => void
  ): UnaryResponse;
}

