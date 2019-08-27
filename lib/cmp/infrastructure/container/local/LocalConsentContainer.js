"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _CookieConsentRepository = _interopRequireDefault(require("../../repository/CookieConsentRepository"));

var _CookieHandler = _interopRequireDefault(require("../../service/CookieHandler"));

var _BaseConsentContainer2 = _interopRequireDefault(require("../BaseConsentContainer"));

/* eslint-disable no-undef */
var LocalConsentContainer =
/*#__PURE__*/
function (_BaseConsentContainer) {
  (0, _inheritsLoose2.default)(LocalConsentContainer, _BaseConsentContainer);

  function LocalConsentContainer(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        config = _ref.config,
        window = _ref.window,
        _ref$cmpVersion = _ref.cmpVersion,
        cmpVersion = _ref$cmpVersion === void 0 ? 1 : _ref$cmpVersion,
        eager = _ref.eager;

    return _BaseConsentContainer.call(this, {
      config: config,
      cmpVersion: cmpVersion,
      window: window
    }) || this;
  }

  var _proto = LocalConsentContainer.prototype;

  _proto._buildConsentRepository = function _buildConsentRepository() {
    return new _CookieConsentRepository.default({
      cookieHandler: this.getInstance({
        key: 'CookieHandler'
      }),
      consentFactory: this.getInstance({
        key: 'ConsentFactory'
      })
    });
  };

  _proto._buildCookieHandler = function _buildCookieHandler() {
    return new _CookieHandler.default({
      dom: this._window.document
    });
  };

  _proto._buildEagerSingletonInstances = function _buildEagerSingletonInstances() {
    _BaseConsentContainer.prototype._buildEagerSingletonInstances.call(this);
  };

  return LocalConsentContainer;
}(_BaseConsentContainer2.default);

exports.default = LocalConsentContainer;