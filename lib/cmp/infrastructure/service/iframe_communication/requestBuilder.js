"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var requestBuilder = function requestBuilder(_ref) {
  var callId = _ref.callId,
      command = _ref.command,
      parameter = _ref.parameter;
  return {
    __cmpCall: {
      callId: callId,
      command: command,
      parameter: parameter
    }
  };
};

var _default = requestBuilder;
exports.default = _default;