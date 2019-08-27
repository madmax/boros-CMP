"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cookie = require("../configuration/cookie");

/**
 * @class
 * @implements ConsentRepository
 */
var CookieConsentRepository =
/*#__PURE__*/
function () {
  function CookieConsentRepository(_ref) {
    var cookieHandler = _ref.cookieHandler,
        consentFactory = _ref.consentFactory;
    this._cookieHandler = cookieHandler;
    this._consentFactory = consentFactory;
    this._cookieName = _cookie.VENDOR_CONSENT_COOKIE_NAME;
    this._maxAgeSeconds = _cookie.VENDOR_CONSENT_COOKIE_MAX_AGE;
    this._path = _cookie.VENDOR_CONSENT_COOKIE_DEFAULT_PATH;
  }
  /**
   *
   * @returns {Promise<ConsentString | undefined>}
   */


  var _proto = CookieConsentRepository.prototype;

  _proto.getConsent = function getConsent() {
    var _this = this;

    return Promise.resolve().then(function () {
      return _this._readCookie();
    }).then(function (encodedConsent) {
      return encodedConsent && _this._createConsent({
        encodedConsent: encodedConsent
      }) || undefined;
    });
  };

  _proto.saveConsent = function saveConsent(_ref2) {
    var _this2 = this;

    var consent = _ref2.consent;
    return Promise.resolve().then(function () {
      return consent.getConsentString();
    }).then(function (encodedConsent) {
      return _this2._writeCookie({
        value: encodedConsent
      });
    });
  };

  _proto._readCookie = function _readCookie() {
    return this._cookieHandler.read({
      cookieName: this._cookieName
    });
  };

  _proto._writeCookie = function _writeCookie(_ref3) {
    var value = _ref3.value;
    return this._cookieHandler.write({
      cookieName: this._cookieName,
      maxAgeSeconds: this._maxAgeSeconds,
      path: this._path,
      value: value
    }).then(function () {
      return true;
    });
  };

  _proto._createConsent = function _createConsent(_ref4) {
    var encodedConsent = _ref4.encodedConsent;
    return this._consentFactory.createConsent({
      encodedConsent: encodedConsent
    });
  };

  return CookieConsentRepository;
}();

exports.default = CookieConsentRepository;