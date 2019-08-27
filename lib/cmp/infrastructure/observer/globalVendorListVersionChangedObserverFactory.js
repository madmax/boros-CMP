"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalVendorListVersionChangedObserverFactory = void 0;

var globalVendorListVersionChangedObserverFactory = function globalVendorListVersionChangedObserverFactory(_ref) {
  var updateConsentVendorsService = _ref.updateConsentVendorsService;
  return function (_ref2) {
    var payload = _ref2.payload,
        dispatcher = _ref2.dispatcher;
    updateConsentVendorsService.updateConsentVendorList({
      consentAcceptedVendors: payload.vendorConsents,
      consentAcceptedPurposes: payload.purposeConsents,
      allowedVendorIds: payload.allowedVendorIds,
      newGlobalVendorList: payload.newGlobalVendorList,
      oldGlobalVendorList: payload.oldGlobalVendorList
    });
  };
};

exports.globalVendorListVersionChangedObserverFactory = globalVendorListVersionChangedObserverFactory;