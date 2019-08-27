"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _iframeConsentCommands = require("../configuration/iframeConsentCommands");

/**
 * @class
 * @implements ConsentRepository
 */
var IframeConsentRepository =
/*#__PURE__*/
function () {
  function IframeConsentRepository(_ref) {
    var iframeCommunicationClient = _ref.iframeCommunicationClient,
        consentFactory = _ref.consentFactory;
    this._iframeCommunicationClient = iframeCommunicationClient;
    this._consentFactory = consentFactory;
  }
  /**
   *
   * @returns {Promise<ConsentString | undefined>}
   */


  var _proto = IframeConsentRepository.prototype;

  _proto.getConsent = function getConsent() {
    var _this = this;

    return Promise.resolve().then(function () {
      return _this._iframeCommunicationClient.request({
        command: _iframeConsentCommands.READ_CONSENT_COMMAND
      });
    }).then(function (encodedConsent) {
      return encodedConsent && _this._consentFactory.createConsent({
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
      return _this2._iframeCommunicationClient.request({
        command: _iframeConsentCommands.WRITE_CONSENT_COMMAND,
        params: {
          value: encodedConsent
        }
      });
    });
  };

  return IframeConsentRepository;
}();

exports.default = IframeConsentRepository;