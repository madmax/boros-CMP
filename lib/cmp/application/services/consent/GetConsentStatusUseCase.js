"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _consentStatus = require("../../../domain/consent/consentStatus");

var GetConsentStatusUseCase =
/*#__PURE__*/
function () {
  function GetConsentStatusUseCase(_ref) {
    var consentRepository = _ref.consentRepository;
    this._consentRepository = consentRepository;
  }
  /**
   * Checks the consent acceptation status.
   * @return {Promise<string>}
   */


  var _proto = GetConsentStatusUseCase.prototype;

  _proto.getConsentStatus = function getConsentStatus() {
    var _this = this;

    return Promise.resolve().then(function () {
      return _this._consentRepository.getConsent();
    }).then(function (consent) {
      return consent ? _consentStatus.CONSENT_STATUS_ACCEPTED : _consentStatus.CONSENT_STATUS_NOT_ACCEPTED;
    });
  };

  return GetConsentStatusUseCase;
}();

exports.default = GetConsentStatusUseCase;