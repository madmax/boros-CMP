"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cookie = require("../../../cmp/infrastructure/configuration/cookie");

/**
 * input:
 * - name
 * - callId
 * source: (event source)
 *
 * @param readCookieUseCase
 */
var readCookieCommandFactory = function readCookieCommandFactory(_ref) {
  var readCookieUseCase = _ref.readCookieUseCase;
  return function (_ref2) {
    var input = _ref2.input;
    return Promise.resolve().then(function () {
      return readCookieUseCase.readCookie({
        name: _cookie.VENDOR_CONSENT_COOKIE_NAME
      });
    }).then(function (value) {
      return {
        __cmpReturn: {
          success: true,
          returnValue: value,
          callId: input.callId
        }
      };
    }).catch(function (e) {
      return {
        __cmpReturn: {
          success: false,
          returnValue: e.message,
          callId: input.callId
        }
      };
    });
  };
};

var _default = readCookieCommandFactory;
exports.default = _default;