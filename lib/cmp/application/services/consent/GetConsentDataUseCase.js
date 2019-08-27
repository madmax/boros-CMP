"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var GetConsentDataUseCase =
/*#__PURE__*/
function () {
  function GetConsentDataUseCase(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$gdprApplies = _ref.gdprApplies,
        gdprApplies = _ref$gdprApplies === void 0 ? true : _ref$gdprApplies,
        _ref$storeConsentGlob = _ref.storeConsentGlobally,
        storeConsentGlobally = _ref$storeConsentGlob === void 0 ? false : _ref$storeConsentGlob,
        consentRepository = _ref.consentRepository;

    this._gdprApplies = gdprApplies;
    this._storeConsentGlobally = storeConsentGlobally;
    this._getStoredConsent = getStoredConsent({
      consentRepository: consentRepository
    });
  }
  /**
   * Returns Vendor Consent Data.
   * @param consentStringVersion - Not supported yet.
   * @return {Promise<VendorConsentData>}
   */


  var _proto = GetConsentDataUseCase.prototype;

  _proto.getConsentData = function getConsentData(_temp2) {
    var _this = this;

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$consentStringVe = _ref2.consentStringVersion,
        consentStringVersion = _ref2$consentStringVe === void 0 ? null : _ref2$consentStringVe;

    // TODO: support consentStringVersion.
    return Promise.resolve().then(this._getStoredConsent).then(function (consent) {
      return {
        gdprApplies: _this._gdprApplies,
        hasGlobalScope: _this._storeConsentGlobally,
        consentData: consent && consent.getConsentString(false) || undefined
      };
    });
  };

  return GetConsentDataUseCase;
}();

exports.default = GetConsentDataUseCase;

var getStoredConsent = function getStoredConsent(_ref3) {
  var consentRepository = _ref3.consentRepository;
  return function () {
    return consentRepository.getConsent();
  };
};