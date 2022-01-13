// package: 
// file: proto/api.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

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
    }
  }
}

