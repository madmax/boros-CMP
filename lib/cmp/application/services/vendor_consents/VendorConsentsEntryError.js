"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var VendorConsentsEntryError =
/*#__PURE__*/
function (_Error) {
  (0, _inheritsLoose2.default)(VendorConsentsEntryError, _Error);

  function VendorConsentsEntryError(_ref) {
    var _this;

    var entry = _ref.entry;
    _this = _Error.call(this) || this;
    _this.name = 'VendorConsentsEntryError';
    _this.message = "Vendor consents entry is invalid " + entry;
    _this.stack = new Error().stack;
    return _this;
  }

  return VendorConsentsEntryError;
}((0, _wrapNativeSuper2.default)(Error));

exports.default = VendorConsentsEntryError;