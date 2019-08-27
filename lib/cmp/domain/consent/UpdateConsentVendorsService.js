"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _whitelistFilter = require("../vendor_consents/whitelistFilter");

var UpdateConsentVendorsService =
/*#__PURE__*/
function () {
  function UpdateConsentVendorsService(_ref) {
    var newVendorsStatusService = _ref.newVendorsStatusService,
        vendorConsentsRepository = _ref.vendorConsentsRepository;
    this._newVendorsStatusService = newVendorsStatusService;
    this._vendorConsentsRepository = vendorConsentsRepository;
  }

  var _proto = UpdateConsentVendorsService.prototype;

  _proto.updateConsentVendorList = function updateConsentVendorList(_ref2) {
    var _this = this;

    var consentAcceptedVendors = _ref2.consentAcceptedVendors,
        consentAcceptedPurposes = _ref2.consentAcceptedPurposes,
        newGlobalVendorList = _ref2.newGlobalVendorList,
        oldGlobalVendorList = _ref2.oldGlobalVendorList,
        allowedVendorIds = _ref2.allowedVendorIds;
    return Promise.resolve().then(function () {
      return _this._resolveNewAcceptedVendorIds({
        consentAcceptedVendors: consentAcceptedVendors,
        newGlobalVendorList: newGlobalVendorList,
        oldGlobalVendorList: oldGlobalVendorList,
        allowedVendorIds: allowedVendorIds
      }).then(function (newAcceptedVendorIds) {
        return _this._saveVendorConsents({
          purposeConsents: consentAcceptedPurposes,
          vendorConsents: newAcceptedVendorIds
        });
      });
    });
  };

  _proto._resolveNewAcceptedVendorIds = function _resolveNewAcceptedVendorIds(_ref3) {
    var _this2 = this;

    var consentAcceptedVendors = _ref3.consentAcceptedVendors,
        newGlobalVendorList = _ref3.newGlobalVendorList,
        oldGlobalVendorList = _ref3.oldGlobalVendorList,
        allowedVendorIds = _ref3.allowedVendorIds;
    return Promise.all([newGlobalVendorList.vendors.map(function (vendor) {
      return vendor.id;
    }), oldGlobalVendorList.vendors.map(function (vendor) {
      return vendor.id;
    })]).then(function (_ref4) {
      var currentGlobalVendorIds = _ref4[0],
          oldGlobalVendorIds = _ref4[1];
      return _this2._updateConsentWithNewGlobalVendorList({
        acceptedVendorIds: consentAcceptedVendors,
        newGlobalVendorIds: currentGlobalVendorIds,
        oldGlobalVendorIds: oldGlobalVendorIds,
        allowedVendorIds: allowedVendorIds
      });
    });
  };

  _proto._updateConsentWithNewGlobalVendorList = function _updateConsentWithNewGlobalVendorList(_ref5) {
    var acceptedVendorIds = _ref5.acceptedVendorIds,
        oldGlobalVendorIds = _ref5.oldGlobalVendorIds,
        newGlobalVendorIds = _ref5.newGlobalVendorIds,
        allowedVendorIds = _ref5.allowedVendorIds;
    return Promise.all([this._newVendorsStatusService.getNewVendorsStatus({
      acceptedVendorIds: acceptedVendorIds,
      globalVendorIds: oldGlobalVendorIds,
      allowedVendorIds: allowedVendorIds
    }), oldGlobalVendorIds.filter(function (id) {
      return newGlobalVendorIds.indexOf(id) < 0;
    }), newGlobalVendorIds.filter(function (id) {
      return oldGlobalVendorIds.indexOf(id) < 0;
    })]).then(function (_ref6) {
      var newVendorsStatus = _ref6[0],
          oldIdsNotInNewGlobalVendors = _ref6[1],
          newIdsNotInOldGlobalVendors = _ref6[2];
      // TODO fn remove ids accepted in the consent that they are not anymore in the new global list
      var newAcceptedVendorIds = acceptedVendorIds.filter(function (id) {
        return oldIdsNotInNewGlobalVendors.indexOf(id) < 0;
      }); // TODO fn new ids from the global list that were not in the old list has to be added in the consent if they are accepted

      if (newVendorsStatus) {
        newIdsNotInOldGlobalVendors.forEach(function (id) {
          return newAcceptedVendorIds.push(id);
        });
      } // TODO fn does not matter if they are or not in global lists, all ids that are not allowed have to be removed


      return newAcceptedVendorIds.filter( // TODO change allowed vendor ids to withelisted vendors
      function (id) {
        return (0, _whitelistFilter.isWhitelisted)({
          whitelist: allowedVendorIds,
          id: id
        });
      });
    });
  };

  _proto._saveVendorConsents = function _saveVendorConsents(_ref7) {
    var vendorConsents = _ref7.vendorConsents,
        purposeConsents = _ref7.purposeConsents;
    return this._vendorConsentsRepository.saveVendorConsents({
      vendorConsents: vendorConsents,
      purposeConsents: purposeConsents
    });
  };

  return UpdateConsentVendorsService;
}();

exports.default = UpdateConsentVendorsService;