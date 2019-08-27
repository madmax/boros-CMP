"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _globalvendorlist = _interopRequireDefault(require("../../../resources/globalvendorlist.json"));

var _consentValidation = require("../../../../cmp/domain/consent/consentValidation");

describe('consentValidation', function () {
  describe('Given a consent and a globalVendor list, getConsentVendorsContext', function () {
    it('Should return ALL_ALLOWED if all vendors from the global vendor list are allowed in the consent', function (done) {
      var givenGlobalVendorIds = _globalvendorlist.default.vendors.map(function (vendor) {
        return vendor.id;
      });

      var givenAcceptedVendorIds = givenGlobalVendorIds;
      (0, _consentValidation.getConsentVendorsContext)({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenAcceptedVendorIds
      }).then(function (value) {
        (0, _chai.expect)(value, 'should be all allowed').to.equal(_consentValidation.ALL_ALLOWED);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return ALL_DISALLOWED if none of the vendors from the global vendor list are allowed in the consent', function (done) {
      var givenGlobalVendorIds = _globalvendorlist.default.vendors.map(function (vendor) {
        return vendor.id;
      });

      var givenAcceptedVendorIds = [];
      (0, _consentValidation.getConsentVendorsContext)({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds
      }).then(function (value) {
        (0, _chai.expect)(value, 'should be all disallowed').to.equal(_consentValidation.ALL_DISALLOWED);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return CUSTOM_ALLOWED if some of but not all the vendors from the global vendor list are allowed in the consent', function (done) {
      var givenGlobalVendorIds = _globalvendorlist.default.vendors.map(function (vendor) {
        return vendor.id;
      });

      var givenAcceptedVendorIds = givenGlobalVendorIds.slice(0, 10);
      (0, _consentValidation.getConsentVendorsContext)({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds
      }).then(function (value) {
        (0, _chai.expect)(value, 'should be custom allowed').to.equal(_consentValidation.CUSTOM_ALLOWED);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('Given a consent and a globalVendor list and a subset of allowed vendor ids, getConsentVendorsContext', function () {
    it('Should return ALL_ALLOWED if all accepted vendors from the global vendor list are allowed in the consent', function (done) {
      var givenGlobalVendorIds = _globalvendorlist.default.vendors.map(function (vendor) {
        return vendor.id;
      });

      var givenAllowedVendorIds = givenGlobalVendorIds.slice(0, 10);
      var givenAcceptedVendorIds = givenAllowedVendorIds;
      (0, _consentValidation.getConsentVendorsContext)({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (value) {
        (0, _chai.expect)(value, 'should be all allowed').to.equal(_consentValidation.ALL_ALLOWED);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return ALL_DISALLOWED if none of the accepted vendors from the global vendor list are allowed in the consent', function (done) {
      var givenGlobalVendorIds = _globalvendorlist.default.vendors.map(function (vendor) {
        return vendor.id;
      });

      var givenAllowedVendorIds = givenGlobalVendorIds.slice(0, 10);
      var givenAcceptedVendorIds = [];
      (0, _consentValidation.getConsentVendorsContext)({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (value) {
        (0, _chai.expect)(value, 'should be all disallowed').to.equal(_consentValidation.ALL_DISALLOWED);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return CUSTOM_ALLOWED if some of but not all the accepted vendors from the global vendor list are allowed in the consent', function (done) {
      var givenGlobalVendorIds = _globalvendorlist.default.vendors.map(function (vendor) {
        return vendor.id;
      });

      var givenAllowedVendorIds = givenGlobalVendorIds.slice(0, 10);
      var givenAcceptedVendorIds = givenAllowedVendorIds.slice(0, 5);
      (0, _consentValidation.getConsentVendorsContext)({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (value) {
        (0, _chai.expect)(value, 'should be custom allowed').to.equal(_consentValidation.CUSTOM_ALLOWED);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});