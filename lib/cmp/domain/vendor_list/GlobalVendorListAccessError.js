"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var GlobalVendorListAccessError =
/*#__PURE__*/
function (_Error) {
  (0, _inheritsLoose2.default)(GlobalVendorListAccessError, _Error);

  function GlobalVendorListAccessError(message) {
    var _this;

    _this = _Error.call(this) || this;
    _this.name = 'GlobalVendorListAccessError';
    _this.message = message;
    _this.stack = new Error().stack;
    return _this;
  }

  return GlobalVendorListAccessError;
}((0, _wrapNativeSuper2.default)(Error));

exports.default = GlobalVendorListAccessError;