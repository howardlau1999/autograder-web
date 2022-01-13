// package: 
// file: proto/api.proto

var proto_api_pb = require("../proto/api_pb");
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
  requestType: proto_api_pb.LoginRequest,
  responseType: proto_api_pb.LoginResponse
};

AutograderService.GetCourseList = {
  methodName: "GetCourseList",
  service: AutograderService,
  requestStream: false,
  responseStream: false,
  requestType: proto_api_pb.GetCourseListRequest,
  responseType: proto_api_pb.GetCourseListResponse
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

exports.AutograderServiceClient = AutograderServiceClient;

