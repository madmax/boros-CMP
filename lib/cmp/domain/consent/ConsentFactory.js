"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DomainEventBus = _interopRequireDefault(require("../event_bus/DomainEventBus"));

var _consentString = require("consent-string");

var _globalVendorListVersionChanged = require("./globalVendorListVersionChanged");

var ConsentFactory =
/*#__PURE__*/
function () {
  function ConsentFactory(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        allowedVendorIds = _ref.allowedVendorIds,
        vendorListRepository = _ref.vendorListRepository;

    this._allowedVendorIds = allowedVendorIds;
    this._vendorListRepository = vendorListRepository;
  }
  /**
   * Decodes a base-64 consent string.
   * If the decoded consent has a vendorListVersion that differs from the current global vendor list version,
   * it will dispatch a GLOBAL_VENDOR_LIST_VERSION_CHANGED event.
   * @param encodedConsent {string}
   * @return {Promise.<ConsentString>}
   */


  var _proto = ConsentFactory.prototype;

  _proto.createConsent = function createConsent(_ref2) {
    var _this = this;

    var encodedConsent = _ref2.encodedConsent;
    return Promise.resolve().then(function () {
      return new _consentString.ConsentString(encodedConsent);
    }).then(function (consent) {
      return Promise.all([consent, _this._getGlobalVendorList()]);
    }).then(function (_ref3) {
      var consent = _ref3[0],
          newGlobalVendorList = _ref3[1];
      return _this._checkConsentGlobalVendorsListVersion({
        consent: consent,
        newGlobalVendorList: newGlobalVendorList
      }).then(function (_ref4) {
        var consent = _ref4.consent,
            oldGlobalVendorList = _ref4.oldGlobalVendorList;
        consent.setGlobalVendorList(oldGlobalVendorList || newGlobalVendorList);
        return consent;
      });
    });
  };

  _proto._getGlobalVendorList = function _getGlobalVendorList(_temp2) {
    var _ref5 = _temp2 === void 0 ? {} : _temp2,
        vendorListVersion = _ref5.vendorListVersion;

    return this._vendorListRepository.getGlobalVendorList({
      vendorListVersion: vendorListVersion
    });
  };

  _proto._checkConsentGlobalVendorsListVersion = function _checkConsentGlobalVendorsListVersion(_ref6) {
    var _this2 = this;

    var consent = _ref6.consent,
        newGlobalVendorList = _ref6.newGlobalVendorList;
    return Promise.resolve().then(function () {
      if (newGlobalVendorList.vendorListVersion !== consent.vendorListVersion) {
        return _this2._getGlobalVendorList({
          vendorListVersion: consent.vendorListVersion
        }).then(function (oldGlobalVendorList) {
          _DomainEventBus.default.raise({
            domainEvent: (0, _globalVendorListVersionChanged.globalVendorListVersionChanged)({
              purposeConsents: consent.allowedPurposeIds,
              vendorConsents: consent.allowedVendorIds,
              newGlobalVendorList: newGlobalVendorList,
              oldGlobalVendorList: oldGlobalVendorList,
              allowedVendorIds: _this2._allowedVendorIds
            })
          });

          return {
            consent: consent,
            oldGlobalVendorList: oldGlobalVendorList
          };
        });
      }

      return {
        consent: consent
      };
    });
  };

  return ConsentFactory;
}();

exports.default = ConsentFactory;