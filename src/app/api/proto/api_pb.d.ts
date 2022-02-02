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

  getToken(): string;
  setToken(value: string): void;

  hasExpireAt(): boolean;
  clearExpireAt(): void;
  getExpireAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setExpireAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

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
    token: string,
    expireAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class GetCourseListRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

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
    userId: number,
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
    }
  }
}

export class GetAssignmentsInCourseRequest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

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
    userId: number,
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
  getUserId(): number;
  setUserId(value: number): void;

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
    userId: number,
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

    getStatus(): SubmissionStatusMap[keyof SubmissionStatusMap];
    setStatus(value: SubmissionStatusMap[keyof SubmissionStatusMap]): void;

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
      status: SubmissionStatusMap[keyof SubmissionStatusMap],
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

    getStatus(): SubmissionStatusMap[keyof SubmissionStatusMap];
    setStatus(value: SubmissionStatusMap[keyof SubmissionStatusMap]): void;

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
      status: SubmissionStatusMap[keyof SubmissionStatusMap],
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
  getUserId(): number;
  setUserId(value: number): void;

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
    userId: number,
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
  getUserId(): number;
  setUserId(value: number): void;

  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  getManifestId(): number;
  setManifestId(value: number): void;

  clearSubmittersList(): void;
  getSubmittersList(): Array<number>;
  setSubmittersList(value: Array<number>): void;
  addSubmitters(value: number, index?: number): number;

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
    userId: number,
    assignmentId: number,
    manifestId: number,
    submittersList: Array<number>,
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

  getStatus(): SubmissionStatusMap[keyof SubmissionStatusMap];
  setStatus(value: SubmissionStatusMap[keyof SubmissionStatusMap]): void;

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
    status: SubmissionStatusMap[keyof SubmissionStatusMap],
  }
}

export interface SubmissionStatusMap {
  QUEUED: 0;
  ABORTED: 1;
  FINISHED: 2;
  CANCELLED: 3;
  RUNNING: 4;
  CANCELLING: 5;
}

export const SubmissionStatus: SubmissionStatusMap;

