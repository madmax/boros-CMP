"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalVendorListVersionChanged = exports.GLOBAL_VENDOR_LIST_VERSION_CHANGED = void 0;
var GLOBAL_VENDOR_LIST_VERSION_CHANGED = 'GLOBAL_VENDOR_LIST_VERSION_CHANGED';
exports.GLOBAL_VENDOR_LIST_VERSION_CHANGED = GLOBAL_VENDOR_LIST_VERSION_CHANGED;

var globalVendorListVersionChanged = function globalVendorListVersionChanged(payload) {
  return {
    eventName: GLOBAL_VENDOR_LIST_VERSION_CHANGED,
    payload: payload
  };
};

exports.globalVendorListVersionChanged = globalVendorListVersionChanged;