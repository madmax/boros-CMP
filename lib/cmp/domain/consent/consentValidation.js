"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CUSTOM_ALLOWED = exports.ALL_DISALLOWED = exports.ALL_ALLOWED = exports.getConsentVendorsContext = void 0;

var _whitelistFilter = require("../vendor_consents/whitelistFilter");

/**
 * Return ALL_ALLOWED, ALL_DISALLOWED, CUSTOM_ALLOWED depending on the consent acceptedVendorIds
 * to have all the globalVendorList vendors (accepted in the allowedVendorList) to be all
 * allowed, none allowed or some vendors allowed and others not, respectively.
 * Note that ALL_ALLOWED may mean that ALL the vendors from the 'allowedVendorIds'
 * were allowed (so they are not the 'all' from the global vendor list)
 * @param acceptedVendorIds
 * @param globalVendorList
 * @param allowedVendorIds
 */
var getConsentVendorsContext = function getConsentVendorsContext(_ref) {
  var acceptedVendorIds = _ref.acceptedVendorIds,
      globalVendorIds = _ref.globalVendorIds,
      allowedVendorIds = _ref.allowedVendorIds;
  return Promise.resolve().then(function () {
    return globalVendorIds.filter(function (id) {
      return (0, _whitelistFilter.isWhitelisted)({
        whitelist: allowedVendorIds,
        id: id
      });
    });
  }).then(function (allowedGlobalVendorIds) {
    return Promise.resolve(allowedGlobalVendorIds.filter(function (id) {
      return (0, _whitelistFilter.isWhitelisted)({
        whitelist: acceptedVendorIds,
        id: id
      });
    }).length).then(function (count) {
      if (count === 0) return ALL_DISALLOWED;
      if (count === allowedGlobalVendorIds.length) return ALL_ALLOWED;
      return CUSTOM_ALLOWED;
    });
  });
};

exports.getConsentVendorsContext = getConsentVendorsContext;
var ALL_ALLOWED = 1;
exports.ALL_ALLOWED = ALL_ALLOWED;
var ALL_DISALLOWED = -1;
exports.ALL_DISALLOWED = ALL_DISALLOWED;
var CUSTOM_ALLOWED = 0;
exports.CUSTOM_ALLOWED = CUSTOM_ALLOWED;