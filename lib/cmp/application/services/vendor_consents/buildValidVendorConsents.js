"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _VendorConsentsFormatError = _interopRequireDefault(require("./VendorConsentsFormatError"));

var _VendorConsentsEntryError = _interopRequireDefault(require("./VendorConsentsEntryError"));

/**
 * Converts a consentAttribute (vendorConsents or purposeConsents object) to
 * an array of consented ids for that object.
 * A consentAttribute object must be in the manner: {id1: boolean, id2: boolean,...}
 * @param consents Consents provided by the user
 * @param consents.vendorConsents<number, string> Vendor allowed or not
 * @param consents.purposeConsents<number, string> Purposes allowed or not
 */
var buildValidVendorConsents = function buildValidVendorConsents(consents) {
  return Promise.resolve(consents).then(filterValidFormat).then(function (validConsents) {
    return Promise.all([Object.entries(validConsents.vendorConsents).filter(filterValidEntry).filter(function (entry) {
      return entry[1];
    }).map(function (entry) {
      return parseInt(entry[0]);
    }), Object.entries(validConsents.purposeConsents).filter(filterValidEntry).filter(function (entry) {
      return entry[1];
    }).map(function (entry) {
      return parseInt(entry[0]);
    })]).then(function (_ref) {
      var vendorConsents = _ref[0],
          purposeConsents = _ref[1];
      return {
        vendorConsents: vendorConsents,
        purposeConsents: purposeConsents
      };
    });
  });
};

var filterValidFormat = function filterValidFormat(consents) {
  return Promise.resolve().then(function () {
    return consents.vendorConsents && consents.purposeConsents && consents || Promise.reject(new _VendorConsentsFormatError.default({
      vendorConsents: consents
    }));
  });
};

var filterValidEntry = function filterValidEntry(entry) {
  if (isNaN(entry[0])) {
    throw new _VendorConsentsEntryError.default({
      entry: entry
    });
  }

  if (typeof entry[1] !== 'boolean') {
    throw new _VendorConsentsEntryError.default({
      entry: entry
    });
  }

  return entry;
};

var _default = buildValidVendorConsents;
exports.default = _default;