"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var VendorConsentsFormatError =
/*#__PURE__*/
function (_Error) {
  (0, _inheritsLoose2.default)(VendorConsentsFormatError, _Error);

  function VendorConsentsFormatError(_ref) {
    var _this;

    var vendorConsents = _ref.vendorConsents;
    _this = _Error.call(this) || this;
    _this.name = 'VendorConsentsFormatError';
    _this.message = "vendor consents object has an invalid format " + vendorConsents;
    _this.stack = new Error().stack;
    return _this;
  }

  return VendorConsentsFormatError;
}((0, _wrapNativeSuper2.default)(Error));

exports.default = VendorConsentsFormatError;