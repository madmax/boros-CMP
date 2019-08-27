"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var WriteCookieUseCase =
/*#__PURE__*/
function () {
  function WriteCookieUseCase(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        cookieHandler = _ref.cookieHandler,
        domain = _ref.domain;

    this._setCookieValue = setCookieValue({
      cookieHandler: cookieHandler,
      domain: domain
    });
  }

  var _proto = WriteCookieUseCase.prototype;

  _proto.writeCookie = function writeCookie(_ref2) {
    var _this = this;

    var name = _ref2.name,
        value = _ref2.value,
        path = _ref2.path,
        maxAgeSeconds = _ref2.maxAgeSeconds;
    return Promise.resolve().then(function () {
      return _this._setCookieValue({
        name: name,
        value: value,
        path: path,
        maxAgeSeconds: maxAgeSeconds
      });
    });
  };

  return WriteCookieUseCase;
}();

exports.default = WriteCookieUseCase;

var setCookieValue = function setCookieValue(_ref3) {
  var cookieHandler = _ref3.cookieHandler,
      domain = _ref3.domain;
  return function (_temp2) {
    var _ref4 = _temp2 === void 0 ? {} : _temp2,
        name = _ref4.name,
        value = _ref4.value,
        path = _ref4.path,
        maxAgeSeconds = _ref4.maxAgeSeconds;

    return cookieHandler.write({
      cookieName: name,
      cookieDomain: domain,
      value: value,
      path: path,
      maxAgeSeconds: maxAgeSeconds
    });
  };
};