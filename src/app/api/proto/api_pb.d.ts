// package: 
// file: api.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as model_pb from "./model_pb";

export class UploadFileRequest extends jspb.Message {
  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadFileRequest): UploadFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadFileRequest;
  static deserializeBinaryFromReader(message: UploadFileRequest, reader: jspb.BinaryReader): UploadFileRequest;
}

export namespace UploadFileRequest {
  export type AsObject = {
    filename: string,
  }
}

export class UploadFileResponse extends jspb.Message {
  getUploadId(): string;
  setUploadId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadFileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UploadFileResponse): UploadFileResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadFileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadFileResponse;
  static deserializeBinaryFromReader(message: UploadFileResponse, reader: jspb.BinaryReader): UploadFileResponse;
}

export namespace UploadFileResponse {
  export type AsObject = {
    uploadId: string,
  }
}

export class UploadChunkRequest extends jspb.Message {
  getUploadId(): string;
  setUploadId(value: string): void;

  getOffset(): number;
  setOffset(value: number): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadChunkRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadChunkRequest): UploadChunkRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadChunkRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadChunkRequest;
  static deserializeBinaryFromReader(message: UploadChunkRequest, reader: jspb.BinaryReader): UploadChunkRequest;
}

export namespace UploadChunkRequest {
  export type AsObject = {
    uploadId: string,
    offset: number,
    data: Uint8Array | string,
  }
}

export class UploadChunkResponse extends jspb.Message {
  getUploadId(): string;
  setUploadId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadChunkResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UploadChunkResponse): UploadChunkResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadChunkResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadChunkResponse;
  static deserializeBinaryFromReader(message: UploadChunkResponse, reader: jspb.BinaryReader): UploadChunkResponse;
}

export namespace UploadChunkResponse {
  export type AsObject = {
    uploadId: string,
  }
}

export class LoginRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  getChallengeToken(): string;
  setChallengeToken(value: string): void;

  getCaptcha(): string;
  setCaptcha(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    username: string,
    password: string,
    challengeToken: string,
    captcha: string,
  }
}

export class LoginResponse extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    userId: number,
  }
}

export class GetCourseListRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCourseListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCourseListRequest): GetCourseListRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCourseListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCourseListRequest;
  static deserializeBinaryFromReader(message: GetCourseListRequest, reader: jspb.BinaryReader): GetCourseListRequest;
}

export namespace GetCourseListRequest {
  export type AsObject = {
  }
}

export class GetCourseListResponse extends jspb.Message {
  clearCoursesList(): void;
  getCoursesList(): Array<GetCourseListResponse.CourseCardInfo>;
  setCoursesList(value: Array<GetCourseListResponse.CourseCardInfo>): void;
  addCourses(value?: GetCourseListResponse.CourseCardInfo, index?: number): GetCourseListResponse.CourseCardInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCourseListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCourseListResponse): GetCourseListResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCourseListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCourseListResponse;
  static deserializeBinaryFromReader(message: GetCourseListResponse, reader: jspb.BinaryReader): GetCourseListResponse;
}

export namespace GetCourseListResponse {
  export type AsObject = {
    coursesList: Array<GetCourseListResponse.CourseCardInfo.AsObject>,
  }

  export class CourseCardInfo extends jspb.Message {
    getName(): string;
    setName(value: string): void;

    getShortName(): string;
    setShortName(value: string): void;

    getRole(): model_pb.CourseRoleMap[keyof model_pb.CourseRoleMap];
    setRole(value: model_pb.CourseRoleMap[keyof model_pb.CourseRoleMap]): void;

    getCourseId(): number;
    setCourseId(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CourseCardInfo.AsObject;
    static toObject(includeInstance: boolean, msg: CourseCardInfo): CourseCardInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CourseCardInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CourseCardInfo;
    static deserializeBinaryFromReader(message: CourseCardInfo, reader: jspb.BinaryReader): CourseCardInfo;
  }

  export namespace CourseCardInfo {
    export type AsObject = {
      name: string,
      shortName: string,
      role: model_pb.CourseRoleMap[keyof model_pb.CourseRoleMap],
      courseId: number,
    }
  }
}

export class GetAssignmentsInCourseRequest extends jspb.Message {
  getCourseId(): number;
  setCourseId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAssignmentsInCourseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAssignmentsInCourseRequest): GetAssignmentsInCourseRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAssignmentsInCourseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAssignmentsInCourseRequest;
  static deserializeBinaryFromReader(message: GetAssignmentsInCourseRequest, reader: jspb.BinaryReader): GetAssignmentsInCourseRequest;
}

export namespace GetAssignmentsInCourseRequest {
  export type AsObject = {
    courseId: number,
  }
}

export class GetAssignmentsInCourseResponse extends jspb.Message {
  clearAssignmentsList(): void;
  getAssignmentsList(): Array<GetAssignmentsInCourseResponse.CourseAssignmentInfo>;
  setAssignmentsList(value: Array<GetAssignmentsInCourseResponse.CourseAssignmentInfo>): void;
  addAssignments(value?: GetAssignmentsInCourseResponse.CourseAssignmentInfo, index?: number): GetAssignmentsInCourseResponse.CourseAssignmentInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAssignmentsInCourseResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAssignmentsInCourseResponse): GetAssignmentsInCourseResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAssignmentsInCourseResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAssignmentsInCourseResponse;
  static deserializeBinaryFromReader(message: GetAssignmentsInCourseResponse, reader: jspb.BinaryReader): GetAssignmentsInCourseResponse;
}

export namespace GetAssignmentsInCourseResponse {
  export type AsObject = {
    assignmentsList: Array<GetAssignmentsInCourseResponse.CourseAssignmentInfo.AsObject>,
  }

  export class CourseAssignmentInfo extends jspb.Message {
    getAssignmentId(): number;
    setAssignmentId(value: number): void;

    getName(): string;
    setName(value: string): void;

    hasReleaseDate(): boolean;
    clearReleaseDate(): void;
    getReleaseDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setReleaseDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

    hasDueDate(): boolean;
    clearDueDate(): void;
    getDueDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDueDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

    getSubmitted(): boolean;
    setSubmitted(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CourseAssignmentInfo.AsObject;
    static toObject(includeInstance: boolean, msg: CourseAssignmentInfo): CourseAssignmentInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CourseAssignmentInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CourseAssignmentInfo;
    static deserializeBinaryFromReader(message: CourseAssignmentInfo, reader: jspb.BinaryReader): CourseAssignmentInfo;
  }

  export namespace CourseAssignmentInfo {
    export type AsObject = {
      assignmentId: number,
      name: string,
      releaseDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
      dueDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
      submitted: boolean,
    }
  }
}

export class GetSubmissionsInAssignmentRequest extends jspb.Message {
  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSubmissionsInAssignmentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSubmissionsInAssignmentRequest): GetSubmissionsInAssignmentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSubmissionsInAssignmentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSubmissionsInAssignmentRequest;
  static deserializeBinaryFromReader(message: GetSubmissionsInAssignmentRequest, reader: jspb.BinaryReader): GetSubmissionsInAssignmentRequest;
}

export namespace GetSubmissionsInAssignmentRequest {
  export type AsObject = {
    assignmentId: number,
  }
}

export class GetSubmissionsInAssignmentResponse extends jspb.Message {
  clearSubmissionsList(): void;
  getSubmissionsList(): Array<GetSubmissionsInAssignmentResponse.SubmissionInfo>;
  setSubmissionsList(value: Array<GetSubmissionsInAssignmentResponse.SubmissionInfo>): void;
  addSubmissions(value?: GetSubmissionsInAssignmentResponse.SubmissionInfo, index?: number): GetSubmissionsInAssignmentResponse.SubmissionInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSubmissionsInAssignmentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSubmissionsInAssignmentResponse): GetSubmissionsInAssignmentResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSubmissionsInAssignmentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSubmissionsInAssignmentResponse;
  static deserializeBinaryFromReader(message: GetSubmissionsInAssignmentResponse, reader: jspb.BinaryReader): GetSubmissionsInAssignmentResponse;
}

export namespace GetSubmissionsInAssignmentResponse {
  export type AsObject = {
    submissionsList: Array<GetSubmissionsInAssignmentResponse.SubmissionInfo.AsObject>,
  }

  export class SubmissionInfo extends jspb.Message {
    getSubmissionId(): number;
    setSubmissionId(value: number): void;

    hasSubmittedAt(): boolean;
    clearSubmittedAt(): void;
    getSubmittedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setSubmittedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

    clearSubmittersList(): void;
    getSubmittersList(): Array<GetSubmissionsInAssignmentResponse.SubmissionInfo.Submitter>;
    setSubmittersList(value: Array<GetSubmissionsInAssignmentResponse.SubmissionInfo.Submitter>): void;
    addSubmitters(value?: GetSubmissionsInAssignmentResponse.SubmissionInfo.Submitter, index?: number): GetSubmissionsInAssignmentResponse.SubmissionInfo.Submitter;

    getScore(): number;
    setScore(value: number): void;

    getMaxScore(): number;
    setMaxScore(value: number): void;

    getStatus(): model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap];
    setStatus(value: model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap]): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmissionInfo.AsObject;
    static toObject(includeInstance: boolean, msg: SubmissionInfo): SubmissionInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmissionInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmissionInfo;
    static deserializeBinaryFromReader(message: SubmissionInfo, reader: jspb.BinaryReader): SubmissionInfo;
  }

  export namespace SubmissionInfo {
    export type AsObject = {
      submissionId: number,
      submittedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
      submittersList: Array<GetSubmissionsInAssignmentResponse.SubmissionInfo.Submitter.AsObject>,
      score: number,
      maxScore: number,
      status: model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap],
    }

    export class Submitter extends jspb.Message {
      getUserId(): number;
      setUserId(value: number): void;

      getUsername(): string;
      setUsername(value: string): void;

      serializeBinary(): Uint8Array;
      toObject(includeInstance?: boolean): Submitter.AsObject;
      static toObject(includeInstance: boolean, msg: Submitter): Submitter.AsObject;
      static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
      static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
      static serializeBinaryToWriter(message: Submitter, writer: jspb.BinaryWriter): void;
      static deserializeBinary(bytes: Uint8Array): Submitter;
      static deserializeBinaryFromReader(message: Submitter, reader: jspb.BinaryReader): Submitter;
    }

    export namespace Submitter {
      export type AsObject = {
        userId: number,
        username: string,
      }
    }
  }
}

export class SubscribeSubmissionsRequest extends jspb.Message {
  clearSubmissionIdsList(): void;
  getSubmissionIdsList(): Array<number>;
  setSubmissionIdsList(value: Array<number>): void;
  addSubmissionIds(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeSubmissionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeSubmissionsRequest): SubscribeSubmissionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeSubmissionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeSubmissionsRequest;
  static deserializeBinaryFromReader(message: SubscribeSubmissionsRequest, reader: jspb.BinaryReader): SubscribeSubmissionsRequest;
}

export namespace SubscribeSubmissionsRequest {
  export type AsObject = {
    submissionIdsList: Array<number>,
  }
}

export class SubscribeSubmissionsResponse extends jspb.Message {
  clearUpdatesList(): void;
  getUpdatesList(): Array<SubscribeSubmissionsResponse.StatusUpdate>;
  setUpdatesList(value: Array<SubscribeSubmissionsResponse.StatusUpdate>): void;
  addUpdates(value?: SubscribeSubmissionsResponse.StatusUpdate, index?: number): SubscribeSubmissionsResponse.StatusUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeSubmissionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeSubmissionsResponse): SubscribeSubmissionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeSubmissionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeSubmissionsResponse;
  static deserializeBinaryFromReader(message: SubscribeSubmissionsResponse, reader: jspb.BinaryReader): SubscribeSubmissionsResponse;
}

export namespace SubscribeSubmissionsResponse {
  export type AsObject = {
    updatesList: Array<SubscribeSubmissionsResponse.StatusUpdate.AsObject>,
  }

  export class StatusUpdate extends jspb.Message {
    getSubmissionId(): number;
    setSubmissionId(value: number): void;

    getScore(): number;
    setScore(value: number): void;

    getStatus(): model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap];
    setStatus(value: model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap]): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatusUpdate.AsObject;
    static toObject(includeInstance: boolean, msg: StatusUpdate): StatusUpdate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatusUpdate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatusUpdate;
    static deserializeBinaryFromReader(message: StatusUpdate, reader: jspb.BinaryReader): StatusUpdate;
  }

  export namespace StatusUpdate {
    export type AsObject = {
      submissionId: number,
      score: number,
      status: model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap],
    }
  }
}

export class StreamSubmissionLogRequest extends jspb.Message {
  getSubmissionId(): number;
  setSubmissionId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamSubmissionLogRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StreamSubmissionLogRequest): StreamSubmissionLogRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StreamSubmissionLogRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamSubmissionLogRequest;
  static deserializeBinaryFromReader(message: StreamSubmissionLogRequest, reader: jspb.BinaryReader): StreamSubmissionLogRequest;
}

export namespace StreamSubmissionLogRequest {
  export type AsObject = {
    submissionId: number,
  }
}

export class GetFileRequest extends jspb.Message {
  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFileRequest): GetFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFileRequest;
  static deserializeBinaryFromReader(message: GetFileRequest, reader: jspb.BinaryReader): GetFileRequest;
}

export namespace GetFileRequest {
  export type AsObject = {
    path: string,
  }
}

export class ChunkResponse extends jspb.Message {
  getChunk(): string;
  setChunk(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChunkResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChunkResponse): ChunkResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChunkResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChunkResponse;
  static deserializeBinaryFromReader(message: ChunkResponse, reader: jspb.BinaryReader): ChunkResponse;
}

export namespace ChunkResponse {
  export type AsObject = {
    chunk: string,
  }
}

export class CreateManifestRequest extends jspb.Message {
  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateManifestRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateManifestRequest): CreateManifestRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateManifestRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateManifestRequest;
  static deserializeBinaryFromReader(message: CreateManifestRequest, reader: jspb.BinaryReader): CreateManifestRequest;
}

export namespace CreateManifestRequest {
  export type AsObject = {
    assignmentId: number,
  }
}

export class CreateManifestResponse extends jspb.Message {
  getManifestId(): number;
  setManifestId(value: number): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateManifestResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateManifestResponse): CreateManifestResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateManifestResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateManifestResponse;
  static deserializeBinaryFromReader(message: CreateManifestResponse, reader: jspb.BinaryReader): CreateManifestResponse;
}

export namespace CreateManifestResponse {
  export type AsObject = {
    manifestId: number,
    token: string,
  }
}

export class InitUploadRequest extends jspb.Message {
  getManifestId(): number;
  setManifestId(value: number): void;

  getFilename(): string;
  setFilename(value: string): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitUploadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitUploadRequest): InitUploadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InitUploadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitUploadRequest;
  static deserializeBinaryFromReader(message: InitUploadRequest, reader: jspb.BinaryReader): InitUploadRequest;
}

export namespace InitUploadRequest {
  export type AsObject = {
    manifestId: number,
    filename: string,
    token: string,
  }
}

export class InitUploadResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitUploadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitUploadResponse): InitUploadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InitUploadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitUploadResponse;
  static deserializeBinaryFromReader(message: InitUploadResponse, reader: jspb.BinaryReader): InitUploadResponse;
}

export namespace InitUploadResponse {
  export type AsObject = {
    token: string,
  }
}

export class CreateSubmissionRequest extends jspb.Message {
  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  getManifestId(): number;
  setManifestId(value: number): void;

  clearSubmittersList(): void;
  getSubmittersList(): Array<number>;
  setSubmittersList(value: Array<number>): void;
  addSubmitters(value: number, index?: number): number;

  getLeaderboardName(): string;
  setLeaderboardName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateSubmissionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateSubmissionRequest): CreateSubmissionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateSubmissionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateSubmissionRequest;
  static deserializeBinaryFromReader(message: CreateSubmissionRequest, reader: jspb.BinaryReader): CreateSubmissionRequest;
}

export namespace CreateSubmissionRequest {
  export type AsObject = {
    assignmentId: number,
    manifestId: number,
    submittersList: Array<number>,
    leaderboardName: string,
  }
}

export class CreateSubmissionResponse extends jspb.Message {
  getSubmissionId(): number;
  setSubmissionId(value: number): void;

  clearFilesList(): void;
  getFilesList(): Array<string>;
  setFilesList(value: Array<string>): void;
  addFiles(value: string, index?: number): string;

  clearSubmittersList(): void;
  getSubmittersList(): Array<string>;
  setSubmittersList(value: Array<string>): void;
  addSubmitters(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateSubmissionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateSubmissionResponse): CreateSubmissionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateSubmissionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateSubmissionResponse;
  static deserializeBinaryFromReader(message: CreateSubmissionResponse, reader: jspb.BinaryReader): CreateSubmissionResponse;
}

export namespace CreateSubmissionResponse {
  export type AsObject = {
    submissionId: number,
    filesList: Array<string>,
    submittersList: Array<string>,
  }
}

export class UploadTokenPayload extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  getManifestId(): number;
  setManifestId(value: number): void;

  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadTokenPayload.AsObject;
  static toObject(includeInstance: boolean, msg: UploadTokenPayload): UploadTokenPayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UploadTokenPayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadTokenPayload;
  static deserializeBinaryFromReader(message: UploadTokenPayload, reader: jspb.BinaryReader): UploadTokenPayload;
}

export namespace UploadTokenPayload {
  export type AsObject = {
    userId: number,
    assignmentId: number,
    manifestId: number,
    filename: string,
  }
}

export class UserTokenPayload extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserTokenPayload.AsObject;
  static toObject(includeInstance: boolean, msg: UserTokenPayload): UserTokenPayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserTokenPayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserTokenPayload;
  static deserializeBinaryFromReader(message: UserTokenPayload, reader: jspb.BinaryReader): UserTokenPayload;
}

export namespace UserTokenPayload {
  export type AsObject = {
    userId: number,
    username: string,
  }
}

export class DownloadTokenPayload extends jspb.Message {
  getRealPath(): string;
  setRealPath(value: string): void;

  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DownloadTokenPayload.AsObject;
  static toObject(includeInstance: boolean, msg: DownloadTokenPayload): DownloadTokenPayload.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DownloadTokenPayload, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DownloadTokenPayload;
  static deserializeBinaryFromReader(message: DownloadTokenPayload, reader: jspb.BinaryReader): DownloadTokenPayload;
}

export namespace DownloadTokenPayload {
  export type AsObject = {
    realPath: string,
    filename: string,
  }
}

export class GetSubmissionReportRequest extends jspb.Message {
  getSubmissionId(): number;
  setSubmissionId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSubmissionReportRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSubmissionReportRequest): GetSubmissionReportRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSubmissionReportRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSubmissionReportRequest;
  static deserializeBinaryFromReader(message: GetSubmissionReportRequest, reader: jspb.BinaryReader): GetSubmissionReportRequest;
}

export namespace GetSubmissionReportRequest {
  export type AsObject = {
    submissionId: number,
  }
}

export class GetSubmissionReportResponse extends jspb.Message {
  hasReport(): boolean;
  clearReport(): void;
  getReport(): model_pb.SubmissionReport | undefined;
  setReport(value?: model_pb.SubmissionReport): void;

  getStatus(): model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap];
  setStatus(value: model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSubmissionReportResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSubmissionReportResponse): GetSubmissionReportResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSubmissionReportResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSubmissionReportResponse;
  static deserializeBinaryFromReader(message: GetSubmissionReportResponse, reader: jspb.BinaryReader): GetSubmissionReportResponse;
}

export namespace GetSubmissionReportResponse {
  export type AsObject = {
    report?: model_pb.SubmissionReport.AsObject,
    status: model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap],
  }
}

export class SubscribeSubmissionRequest extends jspb.Message {
  getSubmissionId(): number;
  setSubmissionId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeSubmissionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeSubmissionRequest): SubscribeSubmissionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeSubmissionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeSubmissionRequest;
  static deserializeBinaryFromReader(message: SubscribeSubmissionRequest, reader: jspb.BinaryReader): SubscribeSubmissionRequest;
}

export namespace SubscribeSubmissionRequest {
  export type AsObject = {
    submissionId: number,
  }
}

export class SubscribeSubmissionResponse extends jspb.Message {
  getScore(): number;
  setScore(value: number): void;

  getMaxscore(): number;
  setMaxscore(value: number): void;

  getStatus(): model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap];
  setStatus(value: model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubscribeSubmissionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SubscribeSubmissionResponse): SubscribeSubmissionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubscribeSubmissionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubscribeSubmissionResponse;
  static deserializeBinaryFromReader(message: SubscribeSubmissionResponse, reader: jspb.BinaryReader): SubscribeSubmissionResponse;
}

export namespace SubscribeSubmissionResponse {
  export type AsObject = {
    score: number,
    maxscore: number,
    status: model_pb.SubmissionStatusMap[keyof model_pb.SubmissionStatusMap],
  }
}

export class GetAssignmentRequest extends jspb.Message {
  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAssignmentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAssignmentRequest): GetAssignmentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAssignmentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAssignmentRequest;
  static deserializeBinaryFromReader(message: GetAssignmentRequest, reader: jspb.BinaryReader): GetAssignmentRequest;
}

export namespace GetAssignmentRequest {
  export type AsObject = {
    assignmentId: number,
  }
}

export class GetAssignmentResponse extends jspb.Message {
  hasAssignment(): boolean;
  clearAssignment(): void;
  getAssignment(): model_pb.Assignment | undefined;
  setAssignment(value?: model_pb.Assignment): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAssignmentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAssignmentResponse): GetAssignmentResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAssignmentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAssignmentResponse;
  static deserializeBinaryFromReader(message: GetAssignmentResponse, reader: jspb.BinaryReader): GetAssignmentResponse;
}

export namespace GetAssignmentResponse {
  export type AsObject = {
    assignment?: model_pb.Assignment.AsObject,
  }
}

export class GetCourseRequest extends jspb.Message {
  getCourseId(): number;
  setCourseId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCourseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCourseRequest): GetCourseRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCourseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCourseRequest;
  static deserializeBinaryFromReader(message: GetCourseRequest, reader: jspb.BinaryReader): GetCourseRequest;
}

export namespace GetCourseRequest {
  export type AsObject = {
    courseId: number,
  }
}

export class GetCourseResponse extends jspb.Message {
  hasCourse(): boolean;
  clearCourse(): void;
  getCourse(): model_pb.Course | undefined;
  setCourse(value?: model_pb.Course): void;

  getRole(): model_pb.CourseRoleMap[keyof model_pb.CourseRoleMap];
  setRole(value: model_pb.CourseRoleMap[keyof model_pb.CourseRoleMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCourseResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCourseResponse): GetCourseResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCourseResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCourseResponse;
  static deserializeBinaryFromReader(message: GetCourseResponse, reader: jspb.BinaryReader): GetCourseResponse;
}

export namespace GetCourseResponse {
  export type AsObject = {
    course?: model_pb.Course.AsObject,
    role: model_pb.CourseRoleMap[keyof model_pb.CourseRoleMap],
  }
}

export class GetFilesInSubmissionRequest extends jspb.Message {
  getSubmissionId(): number;
  setSubmissionId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFilesInSubmissionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetFilesInSubmissionRequest): GetFilesInSubmissionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFilesInSubmissionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFilesInSubmissionRequest;
  static deserializeBinaryFromReader(message: GetFilesInSubmissionRequest, reader: jspb.BinaryReader): GetFilesInSubmissionRequest;
}

export namespace GetFilesInSubmissionRequest {
  export type AsObject = {
    submissionId: number,
  }
}

export class FileTreeNode extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getNodeType(): FileTreeNode.TypeMap[keyof FileTreeNode.TypeMap];
  setNodeType(value: FileTreeNode.TypeMap[keyof FileTreeNode.TypeMap]): void;

  clearChildrenList(): void;
  getChildrenList(): Array<FileTreeNode>;
  setChildrenList(value: Array<FileTreeNode>): void;
  addChildren(value?: FileTreeNode, index?: number): FileTreeNode;

  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileTreeNode.AsObject;
  static toObject(includeInstance: boolean, msg: FileTreeNode): FileTreeNode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileTreeNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileTreeNode;
  static deserializeBinaryFromReader(message: FileTreeNode, reader: jspb.BinaryReader): FileTreeNode;
}

export namespace FileTreeNode {
  export type AsObject = {
    name: string,
    nodeType: FileTreeNode.TypeMap[keyof FileTreeNode.TypeMap],
    childrenList: Array<FileTreeNode.AsObject>,
    path: string,
  }

  export interface TypeMap {
    FOLDER: 0;
    FILE: 1;
  }

  export const Type: TypeMap;
}

export class GetFilesInSubmissionResponse extends jspb.Message {
  clearRootsList(): void;
  getRootsList(): Array<FileTreeNode>;
  setRootsList(value: Array<FileTreeNode>): void;
  addRoots(value?: FileTreeNode, index?: number): FileTreeNode;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFilesInSubmissionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFilesInSubmissionResponse): GetFilesInSubmissionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFilesInSubmissionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFilesInSubmissionResponse;
  static deserializeBinaryFromReader(message: GetFilesInSubmissionResponse, reader: jspb.BinaryReader): GetFilesInSubmissionResponse;
}

export namespace GetFilesInSubmissionResponse {
  export type AsObject = {
    rootsList: Array<FileTreeNode.AsObject>,
  }
}

export class GetLeaderboardRequest extends jspb.Message {
  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLeaderboardRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLeaderboardRequest): GetLeaderboardRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLeaderboardRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLeaderboardRequest;
  static deserializeBinaryFromReader(message: GetLeaderboardRequest, reader: jspb.BinaryReader): GetLeaderboardRequest;
}

export namespace GetLeaderboardRequest {
  export type AsObject = {
    assignmentId: number,
  }
}

export class GetLeaderboardResponse extends jspb.Message {
  clearEntriesList(): void;
  getEntriesList(): Array<model_pb.LeaderboardEntry>;
  setEntriesList(value: Array<model_pb.LeaderboardEntry>): void;
  addEntries(value?: model_pb.LeaderboardEntry, index?: number): model_pb.LeaderboardEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLeaderboardResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLeaderboardResponse): GetLeaderboardResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLeaderboardResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLeaderboardResponse;
  static deserializeBinaryFromReader(message: GetLeaderboardResponse, reader: jspb.BinaryReader): GetLeaderboardResponse;
}

export namespace GetLeaderboardResponse {
  export type AsObject = {
    entriesList: Array<model_pb.LeaderboardEntry.AsObject>,
  }
}

export class HasLeaderboardRequest extends jspb.Message {
  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HasLeaderboardRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HasLeaderboardRequest): HasLeaderboardRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HasLeaderboardRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HasLeaderboardRequest;
  static deserializeBinaryFromReader(message: HasLeaderboardRequest, reader: jspb.BinaryReader): HasLeaderboardRequest;
}

export namespace HasLeaderboardRequest {
  export type AsObject = {
    assignmentId: number,
  }
}

export class HasLeaderboardResponse extends jspb.Message {
  getHasLeaderboard(): boolean;
  setHasLeaderboard(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HasLeaderboardResponse.AsObject;
  static toObject(includeInstance: boolean, msg: HasLeaderboardResponse): HasLeaderboardResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HasLeaderboardResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HasLeaderboardResponse;
  static deserializeBinaryFromReader(message: HasLeaderboardResponse, reader: jspb.BinaryReader): HasLeaderboardResponse;
}

export namespace HasLeaderboardResponse {
  export type AsObject = {
    hasLeaderboard: boolean,
  }
}

export class CreateCourseRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getShortName(): string;
  setShortName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getUserId(): number;
  setUserId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCourseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCourseRequest): CreateCourseRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateCourseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCourseRequest;
  static deserializeBinaryFromReader(message: CreateCourseRequest, reader: jspb.BinaryReader): CreateCourseRequest;
}

export namespace CreateCourseRequest {
  export type AsObject = {
    name: string,
    shortName: string,
    description: string,
    userId: number,
  }
}

export class CreateCourseResponse extends jspb.Message {
  getCourseId(): number;
  setCourseId(value: number): void;

  hasCourse(): boolean;
  clearCourse(): void;
  getCourse(): model_pb.Course | undefined;
  setCourse(value?: model_pb.Course): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCourseResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCourseResponse): CreateCourseResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateCourseResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCourseResponse;
  static deserializeBinaryFromReader(message: CreateCourseResponse, reader: jspb.BinaryReader): CreateCourseResponse;
}

export namespace CreateCourseResponse {
  export type AsObject = {
    courseId: number,
    course?: model_pb.Course.AsObject,
  }
}

export class CreateAssignmentRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getCourseId(): number;
  setCourseId(value: number): void;

  getAssignmentType(): model_pb.AssignmentTypeMap[keyof model_pb.AssignmentTypeMap];
  setAssignmentType(value: model_pb.AssignmentTypeMap[keyof model_pb.AssignmentTypeMap]): void;

  hasReleaseDate(): boolean;
  clearReleaseDate(): void;
  getReleaseDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setReleaseDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasDueDate(): boolean;
  clearDueDate(): void;
  getDueDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDueDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasLateDueDate(): boolean;
  clearLateDueDate(): void;
  getLateDueDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setLateDueDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getDescription(): string;
  setDescription(value: string): void;

  hasProgrammingConfig(): boolean;
  clearProgrammingConfig(): void;
  getProgrammingConfig(): model_pb.ProgrammingAssignmentConfig | undefined;
  setProgrammingConfig(value?: model_pb.ProgrammingAssignmentConfig): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateAssignmentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateAssignmentRequest): CreateAssignmentRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateAssignmentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateAssignmentRequest;
  static deserializeBinaryFromReader(message: CreateAssignmentRequest, reader: jspb.BinaryReader): CreateAssignmentRequest;
}

export namespace CreateAssignmentRequest {
  export type AsObject = {
    name: string,
    courseId: number,
    assignmentType: model_pb.AssignmentTypeMap[keyof model_pb.AssignmentTypeMap],
    releaseDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    dueDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    lateDueDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    description: string,
    programmingConfig?: model_pb.ProgrammingAssignmentConfig.AsObject,
  }
}

export class CreateAssignmentResponse extends jspb.Message {
  hasAssignment(): boolean;
  clearAssignment(): void;
  getAssignment(): model_pb.Assignment | undefined;
  setAssignment(value?: model_pb.Assignment): void;

  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateAssignmentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateAssignmentResponse): CreateAssignmentResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateAssignmentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateAssignmentResponse;
  static deserializeBinaryFromReader(message: CreateAssignmentResponse, reader: jspb.BinaryReader): CreateAssignmentResponse;
}

export namespace CreateAssignmentResponse {
  export type AsObject = {
    assignment?: model_pb.Assignment.AsObject,
    assignmentId: number,
  }
}

export class DeleteFileInManifestRequest extends jspb.Message {
  getManifestId(): number;
  setManifestId(value: number): void;

  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteFileInManifestRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteFileInManifestRequest): DeleteFileInManifestRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteFileInManifestRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteFileInManifestRequest;
  static deserializeBinaryFromReader(message: DeleteFileInManifestRequest, reader: jspb.BinaryReader): DeleteFileInManifestRequest;
}

export namespace DeleteFileInManifestRequest {
  export type AsObject = {
    manifestId: number,
    filename: string,
  }
}

export class DeleteFileInManifestResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteFileInManifestResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteFileInManifestResponse): DeleteFileInManifestResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteFileInManifestResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteFileInManifestResponse;
  static deserializeBinaryFromReader(message: DeleteFileInManifestResponse, reader: jspb.BinaryReader): DeleteFileInManifestResponse;
}

export namespace DeleteFileInManifestResponse {
  export type AsObject = {
  }
}

export class InitDownloadRequest extends jspb.Message {
  getSubmissionId(): number;
  setSubmissionId(value: number): void;

  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitDownloadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitDownloadRequest): InitDownloadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InitDownloadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitDownloadRequest;
  static deserializeBinaryFromReader(message: InitDownloadRequest, reader: jspb.BinaryReader): InitDownloadRequest;
}

export namespace InitDownloadRequest {
  export type AsObject = {
    submissionId: number,
    filename: string,
  }
}

export class InitDownloadResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  getFileType(): DownloadFileTypeMap[keyof DownloadFileTypeMap];
  setFileType(value: DownloadFileTypeMap[keyof DownloadFileTypeMap]): void;

  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitDownloadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitDownloadResponse): InitDownloadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InitDownloadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitDownloadResponse;
  static deserializeBinaryFromReader(message: InitDownloadResponse, reader: jspb.BinaryReader): InitDownloadResponse;
}

export namespace InitDownloadResponse {
  export type AsObject = {
    token: string,
    fileType: DownloadFileTypeMap[keyof DownloadFileTypeMap],
    filename: string,
  }
}

export class GetCourseMembersRequest extends jspb.Message {
  getCourseId(): number;
  setCourseId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCourseMembersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCourseMembersRequest): GetCourseMembersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCourseMembersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCourseMembersRequest;
  static deserializeBinaryFromReader(message: GetCourseMembersRequest, reader: jspb.BinaryReader): GetCourseMembersRequest;
}

export namespace GetCourseMembersRequest {
  export type AsObject = {
    courseId: number,
  }
}

export class GetCourseMembersResponse extends jspb.Message {
  clearMembersList(): void;
  getMembersList(): Array<GetCourseMembersResponse.MemberInfo>;
  setMembersList(value: Array<GetCourseMembersResponse.MemberInfo>): void;
  addMembers(value?: GetCourseMembersResponse.MemberInfo, index?: number): GetCourseMembersResponse.MemberInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCourseMembersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCourseMembersResponse): GetCourseMembersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetCourseMembersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCourseMembersResponse;
  static deserializeBinaryFromReader(message: GetCourseMembersResponse, reader: jspb.BinaryReader): GetCourseMembersResponse;
}

export namespace GetCourseMembersResponse {
  export type AsObject = {
    membersList: Array<GetCourseMembersResponse.MemberInfo.AsObject>,
  }

  export class MemberInfo extends jspb.Message {
    getUserId(): number;
    setUserId(value: number): void;

    getUsername(): string;
    setUsername(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;

    getNickname(): string;
    setNickname(value: string): void;

    getRole(): model_pb.CourseRoleMap[keyof model_pb.CourseRoleMap];
    setRole(value: model_pb.CourseRoleMap[keyof model_pb.CourseRoleMap]): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MemberInfo.AsObject;
    static toObject(includeInstance: boolean, msg: MemberInfo): MemberInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MemberInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MemberInfo;
    static deserializeBinaryFromReader(message: MemberInfo, reader: jspb.BinaryReader): MemberInfo;
  }

  export namespace MemberInfo {
    export type AsObject = {
      userId: number,
      username: string,
      email: string,
      nickname: string,
      role: model_pb.CourseRoleMap[keyof model_pb.CourseRoleMap],
    }
  }
}

export interface DownloadFileTypeMap {
  BINARY: 0;
  TEXT: 1;
  IMAGE: 2;
  PDF: 3;
}

export const DownloadFileType: DownloadFileTypeMap;

