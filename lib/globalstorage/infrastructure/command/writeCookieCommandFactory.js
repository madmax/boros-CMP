"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cookie = require("../../../cmp/infrastructure/configuration/cookie");

/**
 * input:
 * - name
 * - value
 * - path
 * - maxAgeSeconds
 * - callId
 * source: (event source)
 *
 * @param writeCookieUseCase
 */
var writeCookieCommandFactory = function writeCookieCommandFactory(_ref) {
  var writeCookieUseCase = _ref.writeCookieUseCase;
  return function (_ref2) {
    var input = _ref2.input;
    return Promise.resolve().then(function () {
      return writeCookieUseCase.writeCookie({
        name: _cookie.VENDOR_CONSENT_COOKIE_NAME,
        value: input.value,
        path: _cookie.VENDOR_CONSENT_COOKIE_DEFAULT_PATH,
        maxAgeSeconds: _cookie.VENDOR_CONSENT_COOKIE_MAX_AGE
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
          returnValue: e,
          callId: input.callId
        }
      };
    });
  };
};

var _default = writeCookieCommandFactory;
exports.default = _default;