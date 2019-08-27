"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vendorConsentsCreated = exports.VENDOR_CONSENTS_CREATED = void 0;
var VENDOR_CONSENTS_CREATED = 'VENDOR_CONSENTS_CREATED';
exports.VENDOR_CONSENTS_CREATED = VENDOR_CONSENTS_CREATED;

var vendorConsentsCreated = function vendorConsentsCreated(payload) {
  return {
    eventName: VENDOR_CONSENTS_CREATED,
    payload: payload
  };
};

exports.vendorConsentsCreated = vendorConsentsCreated;