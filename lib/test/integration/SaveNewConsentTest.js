"use strict";

var _consentString = require("consent-string");

var _consentStatus = require("../../cmp/domain/consent/consentStatus");

var _initializeTestClientCMP = require("./initializeTestClientCMP");

/* eslint-disable no-console */
describe('Local Store Save New Consent', function () {
  it('Should accept a new Vendor Consents object and then modifying it', function (done) {
    Promise.resolve().then(function () {
      return (0, _initializeTestClientCMP.initializeLocalStoreTestClientCMP)();
    }) // client should check the status of the consent
    .then(function (cmpClient) {
      return doTheJob({
        cmpClient: cmpClient,
        done: done
      });
    }).catch(function (e) {
      return done(e);
    });
  });
});
describe('Global Store Save New Consent', function () {
  it('Should accept a new Vendor Consents object and then modifying it', function (done) {
    Promise.resolve().then(function () {
      return (0, _initializeTestClientCMP.initializeGlobalStoreTestClientCMP)();
    }) // client should check the status of the consent
    .then(function (cmpClient) {
      return doTheJob({
        cmpClient: cmpClient,
        done: done
      });
    }).catch(function (e) {
      return done(e);
    });
  });
});

var doTheJob = function doTheJob(_ref) {
  var cmpClient = _ref.cmpClient,
      done = _ref.done;
  return cmpClient.getConsentStatus() // the first time, the consent should return NOT_ACCEPTED
  .then(function (consentStatusResult) {
    return filterConsentStatus(consentStatusResult.result, _consentStatus.CONSENT_STATUS_NOT_ACCEPTED);
  }) // in that case, the client should get the global vendor list to show the UI tool to edit the consent and show it
  .then(function () {
    return cmpClient.getVendorList().then(function (globalVendorListResult) {
      return (// after editing the consents, the client should save the vendor consents
        cmpClient.setVendorConsents(sampleVendorConsentsEditedInAnUI) // just for validation, now the consent status should be ACCEPTED
        .then(function () {
          return cmpClient.getConsentStatus();
        }).then(function (consentStatusResult) {
          return filterConsentStatus(consentStatusResult.result, _consentStatus.CONSENT_STATUS_ACCEPTED);
        }) // any Advertising SDK that wants to get the consent, now will have it accessible getting the encoded consent data
        .then(function () {
          return cmpClient.getConsentData();
        }).then(function (consentDataResult) {
          return checkEncodedConsent({
            encodedConsent: consentDataResult.result.consentData,
            acceptedConsents: sampleVendorConsentsEditedInAnUI,
            globalVendorList: globalVendorListResult.result
          });
        })
      );
    });
  }).then(function () {
    return done();
  }).catch(function (e) {
    return done(e);
  });
};

var filterConsentStatus = function filterConsentStatus(consentStatus, status) {
  if (consentStatus !== status) {
    throw new Error('Consent Status should be: ' + status + ' actual:' + consentStatus);
  }

  return consentStatus;
};

var sampleVendorConsentsEditedInAnUI = {
  purposeConsents: {
    '1': true,
    '2': true,
    '3': true,
    '4': true
  },
  vendorConsents: {
    '1': true,
    '2': true,
    '3': true,
    '6': true,
    '7': true,
    '8': true
  }
};

var checkEncodedConsent = function checkEncodedConsent(_ref2) {
  var encodedConsent = _ref2.encodedConsent,
      acceptedConsents = _ref2.acceptedConsents,
      globalVendorList = _ref2.globalVendorList;
  var consent = new _consentString.ConsentString(encodedConsent); // the allowed purposes into the encoded consent should be the edited purposes in the UI

  globalVendorList.purposes.map(function (p) {
    return p.id;
  }).forEach(function (id) {
    if (acceptedConsents.purposeConsents[id] && !consent.isPurposeAllowed(id)) {
      console.log(consent.isPurposeAllowed(id));
      throw new Error("Purpose " + id + " should be allowed");
    } else if (!acceptedConsents.purposeConsents[id] && consent.isPurposeAllowed(id)) {
      throw new Error("Purpose " + id + " should not be allowed");
    }
  }); // the allowed vendors into the encoded consent should be the edited vendors in the UI

  globalVendorList.vendors.map(function (v) {
    return v.id;
  }).forEach(function (id) {
    if (acceptedConsents.vendorConsents[id] && !consent.isVendorAllowed(id)) {
      throw new Error("Vendor " + id + " should be allowed");
    } else if (!acceptedConsents.vendorConsents[id] && consent.isVendorAllowed(id)) {
      throw new Error("Vendor " + id + " should not be allowed");
    }
  });
};