// package: 
// file: api.proto

var api_pb = require("./api_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var AutograderService = (function () {
  function AutograderService() {}
  AutograderService.serviceName = "AutograderService";
  return AutograderService;
}());

AutograderService.Login = {
  methodName: "Login",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.LoginRequest,
  responseType: api_pb.LoginResponse
};

AutograderService.GetCourseList = {
  methodName: "GetCourseList",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetCourseListRequest,
  responseType: api_pb.GetCourseListResponse
};

AutograderService.GetAssignmentsInCourse = {
  methodName: "GetAssignmentsInCourse",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetAssignmentsInCourseRequest,
  responseType: api_pb.GetAssignmentsInCourseResponse
};

AutograderService.GetSubmissionsInAssignment = {
  methodName: "GetSubmissionsInAssignment",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetSubmissionsInAssignmentRequest,
  responseType: api_pb.GetSubmissionsInAssignmentResponse
};

AutograderService.SubscribeSubmission = {
  methodName: "SubscribeSubmission",
  service: AutograderService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.SubscribeSubmissionRequest,
  responseType: api_pb.SubscribeSubmissionResponse
};

AutograderService.CreateManifest = {
  methodName: "CreateManifest",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CreateManifestRequest,
  responseType: api_pb.CreateManifestResponse
};

AutograderService.CreateSubmission = {
  methodName: "CreateSubmission",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CreateSubmissionRequest,
  responseType: api_pb.CreateSubmissionResponse
};

AutograderService.InitUpload = {
  methodName: "InitUpload",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.InitUploadRequest,
  responseType: api_pb.InitUploadResponse
};

AutograderService.GetSubmissionReport = {
  methodName: "GetSubmissionReport",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetSubmissionReportRequest,
  responseType: api_pb.GetSubmissionReportResponse
};

AutograderService.GetAssignment = {
  methodName: "GetAssignment",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetAssignmentRequest,
  responseType: api_pb.GetAssignmentResponse
};

AutograderService.GetCourse = {
  methodName: "GetCourse",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetCourseRequest,
  responseType: api_pb.GetCourseResponse
};

AutograderService.CreateCourse = {
  methodName: "CreateCourse",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CreateCourseRequest,
  responseType: api_pb.CreateCourseResponse
};

AutograderService.GetFilesInSubmission = {
  methodName: "GetFilesInSubmission",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetFilesInSubmissionRequest,
  responseType: api_pb.GetFilesInSubmissionResponse
};

AutograderService.GetLeaderboard = {
  methodName: "GetLeaderboard",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetLeaderboardRequest,
  responseType: api_pb.GetLeaderboardResponse
};

AutograderService.HasLeaderboard = {
  methodName: "HasLeaderboard",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.HasLeaderboardRequest,
  responseType: api_pb.HasLeaderboardResponse
};

AutograderService.CreateAssignment = {
  methodName: "CreateAssignment",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CreateAssignmentRequest,
  responseType: api_pb.CreateAssignmentResponse
};

AutograderService.DeleteFileInManifest = {
  methodName: "DeleteFileInManifest",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.DeleteFileInManifestRequest,
  responseType: api_pb.DeleteFileInManifestResponse
};

AutograderService.InitDownload = {
  methodName: "InitDownload",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.InitDownloadRequest,
  responseType: api_pb.InitDownloadResponse
};

AutograderService.GetCourseMembers = {
  methodName: "GetCourseMembers",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetCourseMembersRequest,
  responseType: api_pb.GetCourseMembersResponse
};

AutograderService.AddCourseMembers = {
  methodName: "AddCourseMembers",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.AddCourseMembersRequest,
  responseType: api_pb.AddCourseMembersResponse
};

AutograderService.RemoveCourseMembers = {
  methodName: "RemoveCourseMembers",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.RemoveCourseMembersRequest,
  responseType: api_pb.RemoveCourseMembersResponse
};

AutograderService.UpdateCourseMember = {
  methodName: "UpdateCourseMember",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.UpdateCourseMemberRequest,
  responseType: api_pb.UpdateCourseMemberResponse
};

AutograderService.UpdateCourse = {
  methodName: "UpdateCourse",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.UpdateCourseRequest,
  responseType: api_pb.UpdateCourseResponse
};

AutograderService.UpdateAssignment = {
  methodName: "UpdateAssignment",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.UpdateAssignmentRequest,
  responseType: api_pb.UpdateAssignmentResponse
};

AutograderService.RequestPasswordReset = {
  methodName: "RequestPasswordReset",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.RequestPasswordResetRequest,
  responseType: api_pb.RequestPasswordResetResponse
};

AutograderService.ResetPassword = {
  methodName: "ResetPassword",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ResetPasswordRequest,
  responseType: api_pb.ResetPasswordResponse
};

AutograderService.RequestSignUpToken = {
  methodName: "RequestSignUpToken",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.RequestSignUpTokenRequest,
  responseType: api_pb.RequestSignUpTokenResponse
};

AutograderService.SignUp = {
  methodName: "SignUp",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.SignUpRequest,
  responseType: api_pb.SignUpResponse
};

AutograderService.CanWriteCourse = {
  methodName: "CanWriteCourse",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.CanWriteCourseRequest,
  responseType: api_pb.CanWriteCourseResponse
};

AutograderService.GithubLogin = {
  methodName: "GithubLogin",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GithubLoginRequest,
  responseType: api_pb.GithubLoginResponse
};

AutograderService.GetUser = {
  methodName: "GetUser",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetUserRequest,
  responseType: api_pb.GetUserResponse
};

AutograderService.BindGithub = {
  methodName: "BindGithub",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.BindGithubRequest,
  responseType: api_pb.BindGithubResponse
};

AutograderService.UnbindGithub = {
  methodName: "UnbindGithub",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.UnbindGithubRequest,
  responseType: api_pb.UnbindGithubResponse
};

AutograderService.UpdateUser = {
  methodName: "UpdateUser",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.UpdateUserRequest,
  responseType: api_pb.UpdateUserResponse
};

AutograderService.UpdatePassword = {
  methodName: "UpdatePassword",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.UpdatePasswordRequest,
  responseType: api_pb.UpdatePasswordResponse
};

AutograderService.JoinCourse = {
  methodName: "JoinCourse",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.JoinCourseRequest,
  responseType: api_pb.JoinCourseResponse
};

AutograderService.GenerateJoinCode = {
  methodName: "GenerateJoinCode",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GenerateJoinCodeRequest,
  responseType: api_pb.GenerateJoinCodeResponse
};

AutograderService.ChangeAllowsJoinCourse = {
  methodName: "ChangeAllowsJoinCourse",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ChangeAllowsJoinCourseRequest,
  responseType: api_pb.ChangeAllowsJoinCourseResponse
};

AutograderService.InspectAllSubmissionsInAssignment = {
  methodName: "InspectAllSubmissionsInAssignment",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.InspectAllSubmissionsInAssignmentRequest,
  responseType: api_pb.InspectAllSubmissionsInAssignmentResponse
};

AutograderService.InspectUserSubmissionHistory = {
  methodName: "InspectUserSubmissionHistory",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.InspectUserSubmissionHistoryRequest,
  responseType: api_pb.InspectUserSubmissionHistoryResponse
};

AutograderService.ActivateSubmission = {
  methodName: "ActivateSubmission",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ActivateSubmissionRequest,
  responseType: api_pb.ActivateSubmissionResponse
};

AutograderService.RegradeSubmission = {
  methodName: "RegradeSubmission",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.RegradeSubmissionRequest,
  responseType: api_pb.RegradeSubmissionResponse
};

AutograderService.RegradeAssignment = {
  methodName: "RegradeAssignment",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.RegradeAssignmentRequest,
  responseType: api_pb.RegradeAssignmentResponse
};

AutograderService.ChangeLeaderboardAnonymous = {
  methodName: "ChangeLeaderboardAnonymous",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ChangeLeaderboardAnonymousRequest,
  responseType: api_pb.ChangeLeaderboardAnonymousResponse
};

AutograderService.ExportAssignmentGrades = {
  methodName: "ExportAssignmentGrades",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.ExportAssignmentGradesRequest,
  responseType: api_pb.ExportAssignmentGradesResponse
};

AutograderService.RemoveGrader = {
  methodName: "RemoveGrader",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.RemoveGraderRequest,
  responseType: api_pb.RemoveGraderResponse
};

AutograderService.GetAllGraders = {
  methodName: "GetAllGraders",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetAllGradersRequest,
  responseType: api_pb.GetAllGradersResponse
};

exports.AutograderService = AutograderService;

function AutograderServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AutograderServiceClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.Login, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getCourseList = function getCourseList(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetCourseList, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getAssignmentsInCourse = function getAssignmentsInCourse(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetAssignmentsInCourse, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getSubmissionsInAssignment = function getSubmissionsInAssignment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetSubmissionsInAssignment, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.subscribeSubmission = function subscribeSubmission(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(AutograderService.SubscribeSubmission, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.createManifest = function createManifest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.CreateManifest, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.createSubmission = function createSubmission(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.CreateSubmission, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.initUpload = function initUpload(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.InitUpload, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getSubmissionReport = function getSubmissionReport(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetSubmissionReport, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getAssignment = function getAssignment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetAssignment, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getCourse = function getCourse(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetCourse, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.createCourse = function createCourse(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.CreateCourse, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getFilesInSubmission = function getFilesInSubmission(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetFilesInSubmission, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getLeaderboard = function getLeaderboard(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetLeaderboard, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.hasLeaderboard = function hasLeaderboard(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.HasLeaderboard, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.createAssignment = function createAssignment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.CreateAssignment, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.deleteFileInManifest = function deleteFileInManifest(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.DeleteFileInManifest, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.initDownload = function initDownload(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.InitDownload, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getCourseMembers = function getCourseMembers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetCourseMembers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.addCourseMembers = function addCourseMembers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.AddCourseMembers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.removeCourseMembers = function removeCourseMembers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.RemoveCourseMembers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.updateCourseMember = function updateCourseMember(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.UpdateCourseMember, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.updateCourse = function updateCourse(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.UpdateCourse, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.updateAssignment = function updateAssignment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.UpdateAssignment, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.requestPasswordReset = function requestPasswordReset(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.RequestPasswordReset, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.resetPassword = function resetPassword(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.ResetPassword, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.requestSignUpToken = function requestSignUpToken(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.RequestSignUpToken, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.signUp = function signUp(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.SignUp, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.canWriteCourse = function canWriteCourse(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.CanWriteCourse, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.githubLogin = function githubLogin(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GithubLogin, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getUser = function getUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.bindGithub = function bindGithub(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.BindGithub, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.unbindGithub = function unbindGithub(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.UnbindGithub, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.updateUser = function updateUser(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.UpdateUser, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.updatePassword = function updatePassword(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.UpdatePassword, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.joinCourse = function joinCourse(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.JoinCourse, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.generateJoinCode = function generateJoinCode(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GenerateJoinCode, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.changeAllowsJoinCourse = function changeAllowsJoinCourse(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.ChangeAllowsJoinCourse, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.inspectAllSubmissionsInAssignment = function inspectAllSubmissionsInAssignment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.InspectAllSubmissionsInAssignment, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.inspectUserSubmissionHistory = function inspectUserSubmissionHistory(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.InspectUserSubmissionHistory, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.activateSubmission = function activateSubmission(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.ActivateSubmission, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.regradeSubmission = function regradeSubmission(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.RegradeSubmission, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.regradeAssignment = function regradeAssignment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.RegradeAssignment, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.changeLeaderboardAnonymous = function changeLeaderboardAnonymous(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.ChangeLeaderboardAnonymous, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.exportAssignmentGrades = function exportAssignmentGrades(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.ExportAssignmentGrades, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.removeGrader = function removeGrader(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.RemoveGrader, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AutograderServiceClient.prototype.getAllGraders = function getAllGraders(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AutograderService.GetAllGraders, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.AutograderServiceClient = AutograderServiceClient;

