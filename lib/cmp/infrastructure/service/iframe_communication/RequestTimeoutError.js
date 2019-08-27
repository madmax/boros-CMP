"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var RequestTimeoutError =
/*#__PURE__*/
function (_Error) {
  (0, _inheritsLoose2.default)(RequestTimeoutError, _Error);

  function RequestTimeoutError(callId) {
    var _this;

    _this = _Error.call(this) || this;
    _this.name = 'RequestTimeoutError';
    _this.callId = callId;
    _this.message = "Timeout on request id " + callId;
    _this.stack = new Error().stack;
    return _this;
  }

  return RequestTimeoutError;
}((0, _wrapNativeSuper2.default)(Error));

exports.default = RequestTimeoutError;