// Canonical gRPC status-message codes shared with the server. These mirror the
// values in the server's pkg/grpc/errcode.go and are the wire contract between
// the two, so the strings must not change. The frontend branches on the subset
// it reacts to; `Client*` entries are produced in the browser, not by the
// server.
export const ErrorCode = {
  InvalidToken: 'INVALID_TOKEN',
  WrongPassword: 'WRONG_PASSWORD',
  InvalidJoinCode: 'INVALID_JOIN_CODE',
  InvalidCourseId: 'INVALID_COURSE_ID',
  SubmissionLimit: 'SUBMISSION_LIMIT',
  SubmissionFrequency: 'SUBMISSION_FREQUENCY',
  ManifestFiles: 'MANIFEST_FILES',
  Email: 'EMAIL',
  Username: 'USERNAME',
  EmailDifferent: 'EMAIL_DIFFERENT',
  UsernameDifferent: 'USERNAME_DIFFERENT',
  GetGithubEmails: 'GET_GITHUB_EMAILS',
  GetGithubUser: 'GET_GITHUB_USER',
  InvalidCode: 'INVALID_CODE',
  AlreadyInUse: 'ALREADY_IN_USE',
  Running: 'RUNNING',
  Queued: 'QUEUED',
  Cancelling: 'CANCELLING',
  Cancelled: 'CANCELLED',

  // Produced by the client (OAuth callback state check), never by the server.
  ClientStateMismatch: 'STATE_MISMATCH',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
