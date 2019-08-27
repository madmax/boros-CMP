"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var EventFormatError =
/*#__PURE__*/
function (_Error) {
  (0, _inheritsLoose2.default)(EventFormatError, _Error);

  function EventFormatError(callId) {
    var _this;

    _this = _Error.call(this) || this;
    _this.name = 'EventFormatError';
    _this.callId = callId;
    _this.message = 'Format not valid!';
    return _this;
  }

  return EventFormatError;
}((0, _wrapNativeSuper2.default)(Error));

exports.default = EventFormatError;