"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var CookieHandler =
/*#__PURE__*/
function () {
  function CookieHandler(_ref) {
    var dom = _ref.dom;
    this._dom = dom;
  }
  /**
   * Write a valid string cookie value specified by [IETF RFC 2965]
   * @param {string} cookieName
   * @param {string} value
   * @param {number} maxAgeSeconds
   * @param {string} path
   * @param {string} domain
   * @returns {Promise<string>}
   */


  var _proto = CookieHandler.prototype;

  _proto.write = function write(_temp) {
    var _this = this;

    var _ref2 = _temp === void 0 ? {} : _temp,
        cookieName = _ref2.cookieName,
        value = _ref2.value,
        maxAgeSeconds = _ref2.maxAgeSeconds,
        _ref2$path = _ref2.path,
        path = _ref2$path === void 0 ? '/' : _ref2$path,
        cookieDomain = _ref2.cookieDomain;

    return Promise.all([Promise.resolve(maxAgeSeconds ? ";max-age=" + maxAgeSeconds : ''), Promise.resolve(cookieDomain ? ";domain=" + cookieDomain : '')]).then(function (_ref3) {
      var maxAge = _ref3[0],
          domain = _ref3[1];
      return cookieName + "=" + value + domain + ";path=" + path + maxAge;
    }).then(function (cookieValue) {
      return _this._dom.cookie = cookieValue;
    });
  }
  /**
   * Read cookies by provided name and return value associated
   * @param cookieName
   * @returns {Promise<string | undefined>}
   */
  ;

  _proto.read = function read(_ref4) {
    var cookieName = _ref4.cookieName;
    return Promise.resolve(("; " + this._dom.cookie).split("; " + cookieName + "=")).then(function (cookieParts) {
      return cookieParts.length === 2 && cookieParts.pop().split(';').shift() || undefined;
    });
  };

  return CookieHandler;
}();

exports.default = CookieHandler;