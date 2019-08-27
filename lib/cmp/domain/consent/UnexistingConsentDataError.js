"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var UnexistingConsentDataError =
/*#__PURE__*/
function (_Error) {
  (0, _inheritsLoose2.default)(UnexistingConsentDataError, _Error);

  function UnexistingConsentDataError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.name = 'UnexistingConsentDataError';
    _this.message = "Consent Data has not been set yet";
    _this.stack = new Error().stack;
    return _this;
  }

  return UnexistingConsentDataError;
}((0, _wrapNativeSuper2.default)(Error));

exports.default = UnexistingConsentDataError;