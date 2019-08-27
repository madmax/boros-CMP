"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _IframeConsentRepository = _interopRequireDefault(require("../../repository/IframeConsentRepository"));

var _IframeCommunication = _interopRequireDefault(require("../../controller/IframeCommunication"));

var _BaseConsentContainer2 = _interopRequireDefault(require("../BaseConsentContainer"));

var _IframeCommunicationClient = _interopRequireDefault(require("../../service/iframe_communication/IframeCommunicationClient"));

var _UUIDV4Generator = _interopRequireDefault(require("../../service/UUIDV4Generator"));

var _v = _interopRequireDefault(require("uuid/v4"));

/* eslint-disable no-undef */
var GlobalConsentContainer =
/*#__PURE__*/
function (_BaseConsentContainer) {
  (0, _inheritsLoose2.default)(GlobalConsentContainer, _BaseConsentContainer);

  function GlobalConsentContainer(_temp) {
    var _this;

    var _ref = _temp === void 0 ? {} : _temp,
        config = _ref.config,
        window = _ref.window,
        iframe = _ref.iframe,
        _ref$cmpVersion = _ref.cmpVersion,
        cmpVersion = _ref$cmpVersion === void 0 ? 1 : _ref$cmpVersion,
        eager = _ref.eager;

    _this = _BaseConsentContainer.call(this, {
      config: config,
      cmpVersion: cmpVersion,
      window: window
    }) || this;
    _this._iframe = iframe;
    if (eager) _this._buildEagerSingletonInstances();
    return _this;
  }

  var _proto = GlobalConsentContainer.prototype;

  _proto._buildConsentRepository = function _buildConsentRepository() {
    return new _IframeConsentRepository.default({
      iframeCommunicationClient: this.getInstance({
        key: 'IframeCommunicationClient'
      }),
      consentFactory: this.getInstance({
        key: 'ConsentFactory'
      })
    });
  };

  _proto._buildIframeCommunicationClient = function _buildIframeCommunicationClient() {
    return new _IframeCommunicationClient.default({
      idGenerator: this.getInstance({
        key: 'IdGenerator'
      }),
      origin: this._window,
      target: this._iframe
    });
  };

  _proto._buildIdGenerator = function _buildIdGenerator() {
    return new _UUIDV4Generator.default({
      uuidv4: _v.default
    });
  };

  _proto._buildIframeCommunication = function _buildIframeCommunication() {
    return new _IframeCommunication.default({
      window: this._window
    });
  };

  _proto._buildEagerSingletonInstances = function _buildEagerSingletonInstances() {
    this.getInstance({
      key: 'IframeCommunication'
    });
  };

  return GlobalConsentContainer;
}(_BaseConsentContainer2.default);

exports.default = GlobalConsentContainer;