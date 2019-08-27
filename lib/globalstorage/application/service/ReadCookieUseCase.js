"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var ReadCookieUseCase =
/*#__PURE__*/
function () {
  function ReadCookieUseCase(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        cookieHandler = _ref.cookieHandler;

    this._getCookieValue = getCookieValue({
      cookieHandler: cookieHandler
    });
  }

  var _proto = ReadCookieUseCase.prototype;

  _proto.readCookie = function readCookie(_ref2) {
    var _this = this;

    var name = _ref2.name;
    return Promise.resolve().then(function () {
      return _this._getCookieValue({
        name: name
      });
    });
  };

  return ReadCookieUseCase;
}();

exports.default = ReadCookieUseCase;

var getCookieValue = function getCookieValue(_ref3) {
  var cookieHandler = _ref3.cookieHandler;
  return function (_ref4) {
    var name = _ref4.name;
    return cookieHandler.read({
      cookieName: name
    });
  };
};