"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defaults = require("./defaults");

var _internals = require("./internals");

var Configuration =
/*#__PURE__*/
function () {
  function Configuration(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$gdpr = _ref.gdpr,
        gdpr = _ref$gdpr === void 0 ? {} : _ref$gdpr,
        _ref$consent = _ref.consent,
        consent = _ref$consent === void 0 ? {} : _ref$consent,
        _ref$vendorList = _ref.vendorList,
        vendorList = _ref$vendorList === void 0 ? {} : _ref$vendorList,
        _ref$log = _ref.log,
        log = _ref$log === void 0 ? {} : _ref$log,
        cmpVersion = _ref.cmpVersion;

    this._gdpr = {};
    this._gdpr.gdprApplies = gdpr.gdprApplies || _defaults.DEFAULT_GDPR_APPLIES;
    this._gdpr.storeConsentGlobally = gdpr.storeConsentGlobally || _defaults.DEFAULT_GDPR_STORE_CONSENT_GLOBALLY;
    this._gdpr.globalConsentLocation = gdpr.globalConsentLocation;
    this._consent = {};
    this._consent.cmpId = _internals.CMP_ID;
    this._consent.cmpVersion = cmpVersion;
    this._consent.consentScreen = consent.consentScreen || _defaults.DEFAULT_CONSENT_SCREEN;
    this._consent.consentLanguage = consent.consentLanguage || _defaults.DEFAULT_CONSENT_LANGUAGE;
    this._consent.newVendorsStatusOption = consent.newVendorsStatusOption || _defaults.DEFAULT_NEW_VENDORS_STATUS_OPTION;
    this._consent.allowedVendorIds = consent.allowedVendorIds || undefined;
    this._vendorList = {};
    this._vendorList.host = vendorList.host || _defaults.DEFAULT_VENDOR_LIST_HOST;
    this._vendorList.filename = _defaults.DEFAULT_VENDOR_LIST_FILENAME;
    this._log = {};
    this._log.level = log.level || _defaults.DEFAULT_LOG_LEVEL;
  }

  (0, _createClass2.default)(Configuration, [{
    key: "gdpr",
    get: function get() {
      return this._gdpr;
    }
  }, {
    key: "vendorList",
    get: function get() {
      return this._vendorList;
    }
  }, {
    key: "consent",
    get: function get() {
      return this._consent;
    }
  }, {
    key: "log",
    get: function get() {
      return this._log;
    }
  }]);
  return Configuration;
}();

exports.default = Configuration;