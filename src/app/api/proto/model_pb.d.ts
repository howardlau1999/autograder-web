// package: 
// file: model.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class User extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): void;

  getPassword(): Uint8Array | string;
  getPassword_asU8(): Uint8Array;
  getPassword_asB64(): string;
  setPassword(value: Uint8Array | string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getGithubId(): string;
  setGithubId(value: string): void;

  getNickname(): string;
  setNickname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    username: string,
    password: Uint8Array | string,
    email: string,
    githubId: string,
    nickname: string,
  }
}

export class CourseMember extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

  getRole(): CourseRoleMap[keyof CourseRoleMap];
  setRole(value: CourseRoleMap[keyof CourseRoleMap]): void;

  getCourseId(): number;
  setCourseId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CourseMember.AsObject;
  static toObject(includeInstance: boolean, msg: CourseMember): CourseMember.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CourseMember, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CourseMember;
  static deserializeBinaryFromReader(message: CourseMember, reader: jspb.BinaryReader): CourseMember;
}

export namespace CourseMember {
  export type AsObject = {
    userId: number,
    role: CourseRoleMap[keyof CourseRoleMap],
    courseId: number,
  }
}

export class CourseGroup extends jspb.Message {
  clearUserIdList(): void;
  getUserIdList(): Array<number>;
  setUserIdList(value: Array<number>): void;
  addUserId(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CourseGroup.AsObject;
  static toObject(includeInstance: boolean, msg: CourseGroup): CourseGroup.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CourseGroup, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CourseGroup;
  static deserializeBinaryFromReader(message: CourseGroup, reader: jspb.BinaryReader): CourseGroup;
}

export namespace CourseGroup {
  export type AsObject = {
    userIdList: Array<number>,
  }
}

export class Course extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getShortName(): string;
  setShortName(value: string): void;

  getTerm(): string;
  setTerm(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Course.AsObject;
  static toObject(includeInstance: boolean, msg: Course): Course.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Course, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Course;
  static deserializeBinaryFromReader(message: Course, reader: jspb.BinaryReader): Course;
}

export namespace Course {
  export type AsObject = {
    name: string,
    shortName: string,
    term: string,
    description: string,
  }
}

export class RubricItem extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getScore(): number;
  setScore(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RubricItem.AsObject;
  static toObject(includeInstance: boolean, msg: RubricItem): RubricItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RubricItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RubricItem;
  static deserializeBinaryFromReader(message: RubricItem, reader: jspb.BinaryReader): RubricItem;
}

export namespace RubricItem {
  export type AsObject = {
    id: string,
    score: number,
  }
}

export class ProgrammingAssignmentConfig extends jspb.Message {
  getImage(): string;
  setImage(value: string): void;

  getFullScore(): number;
  setFullScore(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProgrammingAssignmentConfig.AsObject;
  static toObject(includeInstance: boolean, msg: ProgrammingAssignmentConfig): ProgrammingAssignmentConfig.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProgrammingAssignmentConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProgrammingAssignmentConfig;
  static deserializeBinaryFromReader(message: ProgrammingAssignmentConfig, reader: jspb.BinaryReader): ProgrammingAssignmentConfig;
}

export namespace ProgrammingAssignmentConfig {
  export type AsObject = {
    image: string,
    fullScore: number,
  }
}

export class Assignment extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getCourseId(): number;
  setCourseId(value: number): void;

  getAssignmentType(): AssignmentTypeMap[keyof AssignmentTypeMap];
  setAssignmentType(value: AssignmentTypeMap[keyof AssignmentTypeMap]): void;

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

  hasProgrammingConfig(): boolean;
  clearProgrammingConfig(): void;
  getProgrammingConfig(): ProgrammingAssignmentConfig | undefined;
  setProgrammingConfig(value?: ProgrammingAssignmentConfig): void;

  getPublished(): boolean;
  setPublished(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Assignment.AsObject;
  static toObject(includeInstance: boolean, msg: Assignment): Assignment.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Assignment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Assignment;
  static deserializeBinaryFromReader(message: Assignment, reader: jspb.BinaryReader): Assignment;
}

export namespace Assignment {
  export type AsObject = {
    name: string,
    courseId: number,
    assignmentType: AssignmentTypeMap[keyof AssignmentTypeMap],
    releaseDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    dueDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    lateDueDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    programmingConfig?: ProgrammingAssignmentConfig.AsObject,
    published: boolean,
  }
}

export class LeaderboardItem extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getOrder(): string;
  setOrder(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeaderboardItem.AsObject;
  static toObject(includeInstance: boolean, msg: LeaderboardItem): LeaderboardItem.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LeaderboardItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeaderboardItem;
  static deserializeBinaryFromReader(message: LeaderboardItem, reader: jspb.BinaryReader): LeaderboardItem;
}

export namespace LeaderboardItem {
  export type AsObject = {
    name: string,
    value: string,
    order: string,
  }
}

export class SubmissionReportTestcase extends jspb.Message {
  getScore(): number;
  setScore(value: number): void;

  getMaxScore(): number;
  setMaxScore(value: number): void;

  getName(): string;
  setName(value: string): void;

  getOrder(): number;
  setOrder(value: number): void;

  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  getOutput(): string;
  setOutput(value: string): void;

  getOutputPath(): string;
  setOutputPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmissionReportTestcase.AsObject;
  static toObject(includeInstance: boolean, msg: SubmissionReportTestcase): SubmissionReportTestcase.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubmissionReportTestcase, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmissionReportTestcase;
  static deserializeBinaryFromReader(message: SubmissionReportTestcase, reader: jspb.BinaryReader): SubmissionReportTestcase;
}

export namespace SubmissionReportTestcase {
  export type AsObject = {
    score: number,
    maxScore: number,
    name: string,
    order: number,
    tagsList: Array<string>,
    output: string,
    outputPath: string,
  }
}

export class SubmissionReport extends jspb.Message {
  getSubmissionId(): number;
  setSubmissionId(value: number): void;

  getScore(): number;
  setScore(value: number): void;

  getExecutionTime(): number;
  setExecutionTime(value: number): void;

  getOutput(): string;
  setOutput(value: string): void;

  getOutputPath(): string;
  setOutputPath(value: string): void;

  getVisibility(): TestcaseVisibilityMap[keyof TestcaseVisibilityMap];
  setVisibility(value: TestcaseVisibilityMap[keyof TestcaseVisibilityMap]): void;

  getStdoutVisibility(): TestcaseVisibilityMap[keyof TestcaseVisibilityMap];
  setStdoutVisibility(value: TestcaseVisibilityMap[keyof TestcaseVisibilityMap]): void;

  clearTestsList(): void;
  getTestsList(): Array<SubmissionReportTestcase>;
  setTestsList(value: Array<SubmissionReportTestcase>): void;
  addTests(value?: SubmissionReportTestcase, index?: number): SubmissionReportTestcase;

  clearLeaderboardList(): void;
  getLeaderboardList(): Array<LeaderboardItem>;
  setLeaderboardList(value: Array<LeaderboardItem>): void;
  addLeaderboard(value?: LeaderboardItem, index?: number): LeaderboardItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmissionReport.AsObject;
  static toObject(includeInstance: boolean, msg: SubmissionReport): SubmissionReport.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubmissionReport, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmissionReport;
  static deserializeBinaryFromReader(message: SubmissionReport, reader: jspb.BinaryReader): SubmissionReport;
}

export namespace SubmissionReport {
  export type AsObject = {
    submissionId: number,
    score: number,
    executionTime: number,
    output: string,
    outputPath: string,
    visibility: TestcaseVisibilityMap[keyof TestcaseVisibilityMap],
    stdoutVisibility: TestcaseVisibilityMap[keyof TestcaseVisibilityMap],
    testsList: Array<SubmissionReportTestcase.AsObject>,
    leaderboardList: Array<LeaderboardItem.AsObject>,
  }
}

export class Submission extends jspb.Message {
  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  hasSubmittedAt(): boolean;
  clearSubmittedAt(): void;
  getSubmittedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setSubmittedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  clearSubmittersList(): void;
  getSubmittersList(): Array<number>;
  setSubmittersList(value: Array<number>): void;
  addSubmitters(value: number, index?: number): number;

  getPath(): string;
  setPath(value: string): void;

  clearFilesList(): void;
  getFilesList(): Array<string>;
  setFilesList(value: Array<string>): void;
  addFiles(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Submission.AsObject;
  static toObject(includeInstance: boolean, msg: Submission): Submission.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Submission, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Submission;
  static deserializeBinaryFromReader(message: Submission, reader: jspb.BinaryReader): Submission;
}

export namespace Submission {
  export type AsObject = {
    assignmentId: number,
    submittedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    submittersList: Array<number>,
    path: string,
    filesList: Array<string>,
  }
}

export class SubmissionEntry extends jspb.Message {
  hasSubmission(): boolean;
  clearSubmission(): void;
  getSubmission(): Submission | undefined;
  setSubmission(value?: Submission): void;

  hasSubmissionId(): boolean;
  clearSubmissionId(): void;
  getSubmissionId(): number;
  setSubmissionId(value: number): void;

  getEntryOneofCase(): SubmissionEntry.EntryOneofCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SubmissionEntry.AsObject;
  static toObject(includeInstance: boolean, msg: SubmissionEntry): SubmissionEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SubmissionEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SubmissionEntry;
  static deserializeBinaryFromReader(message: SubmissionEntry, reader: jspb.BinaryReader): SubmissionEntry;
}

export namespace SubmissionEntry {
  export type AsObject = {
    submission?: Submission.AsObject,
    submissionId: number,
  }

  export enum EntryOneofCase {
    ENTRY_ONEOF_NOT_SET = 0,
    SUBMISSION = 1,
    SUBMISSION_ID = 2,
  }
}

export class Manifest extends jspb.Message {
  getUserId(): number;
  setUserId(value: number): void;

  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  clearFilesList(): void;
  getFilesList(): Array<string>;
  setFilesList(value: Array<string>): void;
  addFiles(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Manifest.AsObject;
  static toObject(includeInstance: boolean, msg: Manifest): Manifest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Manifest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Manifest;
  static deserializeBinaryFromReader(message: Manifest, reader: jspb.BinaryReader): Manifest;
}

export namespace Manifest {
  export type AsObject = {
    userId: number,
    assignmentId: number,
    filesList: Array<string>,
  }
}

export class Mergeable extends jspb.Message {
  hasCounter(): boolean;
  clearCounter(): void;
  getCounter(): number;
  setCounter(value: number): void;

  hasStrings(): boolean;
  clearStrings(): void;
  getStrings(): Mergeable.StringList | undefined;
  setStrings(value?: Mergeable.StringList): void;

  hasIds(): boolean;
  clearIds(): void;
  getIds(): Mergeable.IdList | undefined;
  setIds(value?: Mergeable.IdList): void;

  getMergeableOneofCase(): Mergeable.MergeableOneofCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Mergeable.AsObject;
  static toObject(includeInstance: boolean, msg: Mergeable): Mergeable.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Mergeable, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Mergeable;
  static deserializeBinaryFromReader(message: Mergeable, reader: jspb.BinaryReader): Mergeable;
}

export namespace Mergeable {
  export type AsObject = {
    counter: number,
    strings?: Mergeable.StringList.AsObject,
    ids?: Mergeable.IdList.AsObject,
  }

  export class StringList extends jspb.Message {
    clearListList(): void;
    getListList(): Array<string>;
    setListList(value: Array<string>): void;
    addList(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StringList.AsObject;
    static toObject(includeInstance: boolean, msg: StringList): StringList.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StringList, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StringList;
    static deserializeBinaryFromReader(message: StringList, reader: jspb.BinaryReader): StringList;
  }

  export namespace StringList {
    export type AsObject = {
      listList: Array<string>,
    }
  }

  export class IdList extends jspb.Message {
    clearListList(): void;
    getListList(): Array<number>;
    setListList(value: Array<number>): void;
    addList(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IdList.AsObject;
    static toObject(includeInstance: boolean, msg: IdList): IdList.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IdList, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IdList;
    static deserializeBinaryFromReader(message: IdList, reader: jspb.BinaryReader): IdList;
  }

  export namespace IdList {
    export type AsObject = {
      listList: Array<number>,
    }
  }

  export enum MergeableOneofCase {
    MERGEABLE_ONEOF_NOT_SET = 0,
    COUNTER = 1,
    STRINGS = 2,
    IDS = 3,
  }
}

export class ManifestMetadata extends jspb.Message {
  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getUserId(): number;
  setUserId(value: number): void;

  getAssignmentId(): number;
  setAssignmentId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ManifestMetadata.AsObject;
  static toObject(includeInstance: boolean, msg: ManifestMetadata): ManifestMetadata.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ManifestMetadata, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ManifestMetadata;
  static deserializeBinaryFromReader(message: ManifestMetadata, reader: jspb.BinaryReader): ManifestMetadata;
}

export namespace ManifestMetadata {
  export type AsObject = {
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    userId: number,
    assignmentId: number,
  }
}

export interface CourseRoleMap {
  STUDENT: 0;
  TA: 1;
  INSTRUCTOR: 2;
  READER: 3;
}

export const CourseRole: CourseRoleMap;

export interface AssignmentTypeMap {
  PROGRAMMING: 0;
}

export const AssignmentType: AssignmentTypeMap;

export interface TestcaseVisibilityMap {
  VISIBLE: 0;
  HIDDEN: 1;
  AFTERDUEDATE: 2;
  AFTERPUBLISHED: 3;
}

export const TestcaseVisibility: TestcaseVisibilityMap;

