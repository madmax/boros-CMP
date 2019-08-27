"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _VendorConsents = _interopRequireDefault(require("./VendorConsents"));

var _whitelistFilter = require("./whitelistFilter");

var VendorConsentsFactory =
/*#__PURE__*/
function () {
  function VendorConsentsFactory(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$gdprApplies = _ref.gdprApplies,
        gdprApplies = _ref$gdprApplies === void 0 ? true : _ref$gdprApplies,
        _ref$storeConsentGlob = _ref.storeConsentGlobally,
        storeConsentGlobally = _ref$storeConsentGlob === void 0 ? false : _ref$storeConsentGlob;

    this._gdprApplies = gdprApplies;
    this._storeConsentGlobally = storeConsentGlobally;
  }

  var _proto = VendorConsentsFactory.prototype;

  _proto.createVendorConsents = function createVendorConsents(_temp2) {
    var _this = this;

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        consent = _ref2.consent,
        globalVendorList = _ref2.globalVendorList,
        allowedVendorIds = _ref2.allowedVendorIds;

    return Promise.resolve().then(function () {
      return Promise.all([filterAllowedVendorIdsFromGlobalList({
        globalVendorList: globalVendorList,
        allowedVendorIds: allowedVendorIds
      }).then(function (filteredVendorIds) {
        return _createVendorConsents({
          consent: consent,
          vendorIds: filteredVendorIds
        });
      }), createPurposeConsents({
        consent: consent,
        globalVendorList: globalVendorList
      })]).then(function (_ref3) {
        var vendorConsents = _ref3[0],
            purposeConsents = _ref3[1];
        return new _VendorConsents.default({
          gdprApplies: _this._gdprApplies,
          hasGlobalScope: _this._storeConsentGlobally,
          metadata: consent.getMetadataString(),
          vendorConsents: vendorConsents,
          purposeConsents: purposeConsents
        });
      });
    });
  };

  return VendorConsentsFactory;
}();

exports.default = VendorConsentsFactory;

var filterAllowedVendorIdsFromGlobalList = function filterAllowedVendorIdsFromGlobalList(_ref4) {
  var globalVendorList = _ref4.globalVendorList,
      allowedVendorIds = _ref4.allowedVendorIds;
  return Promise.resolve().then(function () {
    return globalVendorList.vendors.map(function (v) {
      return v.id;
    }).filter(function (id) {
      return (0, _whitelistFilter.isWhitelisted)({
        whitelist: allowedVendorIds,
        id: id
      });
    });
  });
};

var _createVendorConsents = function _createVendorConsents(_temp3) {
  var _ref5 = _temp3 === void 0 ? {} : _temp3,
      consent = _ref5.consent,
      _ref5$vendorIds = _ref5.vendorIds,
      vendorIds = _ref5$vendorIds === void 0 ? [] : _ref5$vendorIds;

  return Promise.resolve().then(function () {
    return vendorIds.reduce(function (accumulator, id) {
      var _objectSpread2;

      return (0, _objectSpread4.default)({}, accumulator, (_objectSpread2 = {}, _objectSpread2["" + id] = consent.isVendorAllowed(id), _objectSpread2));
    }, {});
  });
};

var createPurposeConsents = function createPurposeConsents(_ref6) {
  var consent = _ref6.consent,
      globalVendorList = _ref6.globalVendorList;
  return Promise.resolve().then(function () {
    return globalVendorList.purposes.map(function (p) {
      return p.id;
    }).reduce(function (accumulator, id) {
      var _objectSpread3;

      return (0, _objectSpread4.default)({}, accumulator, (_objectSpread3 = {}, _objectSpread3["" + id] = consent.isPurposeAllowed(id), _objectSpread3));
    }, {});
  });
};