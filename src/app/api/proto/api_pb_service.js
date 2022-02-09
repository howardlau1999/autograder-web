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

exports.AutograderServiceClient = AutograderServiceClient;

