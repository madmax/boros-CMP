"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _consentString = require("consent-string");

/**
 * @class
 * @implements VendorConsentsRepository
 */
var ConsentStringVendorConsentsRepository =
/*#__PURE__*/
function () {
  /**
   *
   * @param cmpId {number}
   * @param cmpVersion {number}
   * @param consentScreen {number}
   * @param consentLanguage {string}
   * @param vendorConsentsFactory {VendorConsentsFactory}
   * @param consentRepository {ConsentRepository}
   * @param vendorListRepository {VendorListRepository}
   */
  function ConsentStringVendorConsentsRepository(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$cmpId = _ref.cmpId,
        cmpId = _ref$cmpId === void 0 ? requiredArg('cmpId') : _ref$cmpId,
        _ref$cmpVersion = _ref.cmpVersion,
        cmpVersion = _ref$cmpVersion === void 0 ? requiredArg('cmpVersion') : _ref$cmpVersion,
        _ref$consentScreen = _ref.consentScreen,
        consentScreen = _ref$consentScreen === void 0 ? requiredArg('consentScreen') : _ref$consentScreen,
        _ref$consentLanguage = _ref.consentLanguage,
        consentLanguage = _ref$consentLanguage === void 0 ? requiredArg('consentLanguage') : _ref$consentLanguage,
        vendorConsentsFactory = _ref.vendorConsentsFactory,
        consentRepository = _ref.consentRepository,
        vendorListRepository = _ref.vendorListRepository;

    this._cmpId = cmpId;
    this._cmpVersion = cmpVersion;
    this._consentScreen = consentScreen;
    this._consentLanguage = consentLanguage;
    this._vendorConsentsFactory = vendorConsentsFactory;
    this._consentRepository = consentRepository;
    this._vendorListRepository = vendorListRepository;
  }

  var _proto = ConsentStringVendorConsentsRepository.prototype;

  _proto.getVendorConsents = function getVendorConsents(_temp2) {
    var _this = this;

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        allowedVendorIds = _ref2.allowedVendorIds;

    return Promise.resolve().then(function () {
      return _this._getStoredConsent();
    }).then(function (consent) {
      return Promise.all([consent, _this._getGlobalVendorList()]);
    }).then(function (_ref3) {
      var consent = _ref3[0],
          globalVendorList = _ref3[1];
      return consent && _this._createVendorConsents({
        consent: consent,
        globalVendorList: globalVendorList,
        allowedVendorIds: allowedVendorIds
      }) || undefined;
    });
  };

  _proto.saveVendorConsents = function saveVendorConsents(_ref4) {
    var _this2 = this;

    var vendorConsents = _ref4.vendorConsents,
        purposeConsents = _ref4.purposeConsents;
    return Promise.resolve().then(function () {
      return Promise.all([_this2._mapVendorConsentsToConsent({
        vendorConsents: vendorConsents,
        purposeConsents: purposeConsents
      }), _this2._getGlobalVendorList()]).then(function (_ref5) {
        var consent = _ref5[0],
            globalVendorList = _ref5[1];
        consent.setGlobalVendorList(globalVendorList);
        return consent;
      }).then(function (consent) {
        return _this2._saveConsent({
          consent: consent
        });
      });
    });
  };

  _proto._getStoredConsent = function _getStoredConsent() {
    return this._consentRepository.getConsent();
  };

  _proto._saveConsent = function _saveConsent(_ref6) {
    var consent = _ref6.consent;
    return this._consentRepository.saveConsent({
      consent: consent
    });
  };

  _proto._createVendorConsents = function _createVendorConsents(_ref7) {
    var consent = _ref7.consent,
        globalVendorList = _ref7.globalVendorList,
        allowedVendorIds = _ref7.allowedVendorIds;
    return this._vendorConsentsFactory.createVendorConsents({
      consent: consent,
      globalVendorList: globalVendorList,
      allowedVendorIds: allowedVendorIds
    });
  };

  _proto._getGlobalVendorList = function _getGlobalVendorList() {
    return this._vendorListRepository.getGlobalVendorList();
  };

  _proto._mapVendorConsentsToConsent = function _mapVendorConsentsToConsent(_ref8) {
    var vendorConsents = _ref8.vendorConsents,
        purposeConsents = _ref8.purposeConsents;
    var consent = new _consentString.ConsentString();
    consent.setVendorsAllowed(vendorConsents);
    consent.setPurposesAllowed(purposeConsents);
    consent.setCmpId(this._cmpId);
    consent.setCmpVersion(this._cmpVersion);
    consent.setConsentScreen(this._consentScreen);
    consent.setConsentLanguage(this._consentLanguage);
    return consent;
  };

  return ConsentStringVendorConsentsRepository;
}();

exports.default = ConsentStringVendorConsentsRepository;

var requiredArg = function requiredArg(fieldName) {
  throw new Error("Error: " + fieldName + " is required");
};