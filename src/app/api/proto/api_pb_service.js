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

AutograderService.SubscribeSubmissions = {
  methodName: "SubscribeSubmissions",
  service: AutograderService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.SubscribeSubmissionsRequest,
  responseType: api_pb.SubscribeSubmissionsResponse
};

AutograderService.SubscribeSubmission = {
  methodName: "SubscribeSubmission",
  service: AutograderService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.SubscribeSubmissionRequest,
  responseType: api_pb.SubscribeSubmissionResponse
};

AutograderService.StreamSubmissionLog = {
  methodName: "StreamSubmissionLog",
  service: AutograderService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.StreamSubmissionLogRequest,
  responseType: api_pb.ChunkResponse
};

AutograderService.GetFile = {
  methodName: "GetFile",
  service: AutograderService,
  requestStream: false,
  responseStream: true,
  requestType: api_pb.GetFileRequest,
  responseType: api_pb.ChunkResponse
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

AutograderService.GetFilesInSubmission = {
  methodName: "GetFilesInSubmission",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: api_pb.GetFilesInSubmissionRequest,
  responseType: api_pb.GetFilesInSubmissionResponse
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

AutograderServiceClient.prototype.subscribeSubmissions = function subscribeSubmissions(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(AutograderService.SubscribeSubmissions, {
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

AutograderServiceClient.prototype.streamSubmissionLog = function streamSubmissionLog(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(AutograderService.StreamSubmissionLog, {
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

AutograderServiceClient.prototype.getFile = function getFile(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(AutograderService.GetFile, {
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

exports.AutograderServiceClient = AutograderServiceClient;

