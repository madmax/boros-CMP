"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var responseBuilder = function responseBuilder(_ref) {
  var callId = _ref.callId,
      success = _ref.success,
      returnValue = _ref.returnValue;
  return {
    __cmpReturn: {
      callId: callId,
      success: success,
      returnValue: returnValue
    }
  };
};

var _default = responseBuilder;
exports.default = _default;