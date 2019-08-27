"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _consentString = require("consent-string");

var _globalvendorlist = _interopRequireDefault(require("../../../resources/globalvendorlist.json"));

var _VendorConsentsFactory = _interopRequireDefault(require("../../../../cmp/domain/vendor_consents/VendorConsentsFactory"));

describe('VendorConsentsFactory', function () {
  describe('createVendorConsents', function () {
    it('Should return a VendorConsents with all vendors and purposes if no ids restriction is set', function (done) {
      var givenGdprApplies = true;
      var givenStoreConsentGlobally = false;
      var givenGlobalVendorList = _globalvendorlist.default;
      var givenPurposesAllowed = [1, 2];
      var givenVendorsAllowed = [1, 6];
      var givenConsent = new _consentString.ConsentString();
      givenConsent.setPurposesAllowed(givenPurposesAllowed);
      givenConsent.setVendorsAllowed(givenVendorsAllowed);
      var factory = new _VendorConsentsFactory.default({
        gdprApplies: givenGdprApplies,
        storeConsentGlobally: givenStoreConsentGlobally
      });
      factory.createVendorConsents({
        globalVendorList: givenGlobalVendorList,
        consent: givenConsent
      }).then(function (vendorConsents) {
        (0, _chai.expect)(Object.keys(vendorConsents.vendorConsents).length, 'the vendor consents should contain an entry for each vendor in the global list').to.be.equal(givenGlobalVendorList.vendors.length);
        (0, _chai.expect)(Object.keys(vendorConsents.purposeConsents).length, 'the purpose consents should contain an entry for each vendor in the global list').to.be.equal(givenGlobalVendorList.purposes.length);
        givenGlobalVendorList.vendors.forEach(function (v) {
          var condition = givenVendorsAllowed.includes(v.id);
          (0, _chai.expect)(vendorConsents.vendorConsents[v.id], "The vendor consent " + vendorConsents.vendorConsents[v.id] + " should be " + condition).to.equal(condition);
        });
        givenGlobalVendorList.purposes.forEach(function (p) {
          var condition = givenPurposesAllowed.includes(p.id);
          (0, _chai.expect)(vendorConsents.purposeConsents[p.id], "The purpose consent " + vendorConsents.purposeConsents[p.id] + " should be " + condition).to.equal(condition);
        });
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return a VendorConsents with only the existing vendors included in the given vendorIds', function (done) {
      var givenGdprApplies = true;
      var givenStoreConsentGlobally = false;
      var givenGlobalVendorList = _globalvendorlist.default;
      var givenPurposesAllowed = [1, 2];
      var givenVendorsAllowed = [1, 6];
      var givenAllowedVendorIds = [1, 5, 6];
      var givenConsent = new _consentString.ConsentString();
      givenConsent.setPurposesAllowed(givenPurposesAllowed);
      givenConsent.setVendorsAllowed(givenVendorsAllowed);
      var factory = new _VendorConsentsFactory.default({
        gdprApplies: givenGdprApplies,
        storeConsentGlobally: givenStoreConsentGlobally
      });
      factory.createVendorConsents({
        globalVendorList: givenGlobalVendorList,
        consent: givenConsent,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (vendorConsents) {
        (0, _chai.expect)(Object.keys(vendorConsents.vendorConsents).length, 'the vendor consents should contain 2 elements').to.be.equal(2);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return the appropiate metadata info into the consents object', function (done) {
      var givenGlobalVendorList = _globalvendorlist.default;
      var givenConsent = new _consentString.ConsentString();
      givenConsent.setGlobalVendorList(givenGlobalVendorList);
      givenConsent.setCmpId(1);
      givenConsent.setCmpVersion(2);
      givenConsent.setConsentScreen(3);
      var factory = new _VendorConsentsFactory.default();
      factory.createVendorConsents({
        globalVendorList: givenGlobalVendorList,
        consent: givenConsent
      }).then(function (vendorConsents) {
        return _consentString.ConsentString.decodeMetadataString(vendorConsents.metadata);
      }).then(function (metadata) {
        (0, _chai.expect)(metadata.cmpId, 'Metadata has invalid cmpId').to.equal(1);
        (0, _chai.expect)(metadata.vendorListVersion, 'Metadata has invalid vendorListVersion').to.equal(givenGlobalVendorList.vendorListVersion);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});