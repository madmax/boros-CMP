"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _globalvendorlist = _interopRequireDefault(require("../../../resources/globalvendorlist.json"));

var _globalvendorlist2 = _interopRequireDefault(require("../../../resources/globalvendorlist.73.json"));

var _UpdateConsentVendorsService = _interopRequireDefault(require("../../../../cmp/domain/consent/UpdateConsentVendorsService"));

var _NewVendorsStatusService = require("../../../../cmp/domain/vendor_consents/NewVendorsStatusService");

describe('UpdateConsentVendorsService', function () {
  describe('Given consented vendors with a version list number that differs to the version list number of the global vendor list, assuming that all new vendors are accepted (ALL_ALLOW option)', function () {
    it('Should save a new consent with the new vendors from the v74 list that are not in the v73', function (done) {
      var givenNewGlobalVendorList = _globalvendorlist.default;
      var givenOldGlobalVendorList = _globalvendorlist2.default;
      var givenAcceptedVendors = givenOldGlobalVendorList.vendors.map(function (vendor) {
        return vendor.id;
      });
      var givenAcceptedPurposes = givenOldGlobalVendorList.purposes.map(function (purpose) {
        return purpose.id;
      });
      var givenNewVendorsAcceptationOption = 'OPTION_ALL_ALLOW';
      var vendorConsentsRepositoryMock = {
        saveVendorConsents: function saveVendorConsents() {
          return Promise.resolve();
        }
      };

      var saveVendorConsentsSpy = _sinon.default.spy(vendorConsentsRepositoryMock, 'saveVendorConsents');

      var newVendorsStatusService = new _NewVendorsStatusService.NewVendorsStatusService({
        option: givenNewVendorsAcceptationOption
      });
      var service = new _UpdateConsentVendorsService.default({
        vendorConsentsRepository: vendorConsentsRepositoryMock,
        newVendorsStatusService: newVendorsStatusService
      });
      service.updateConsentVendorList({
        consentAcceptedVendors: givenAcceptedVendors,
        consentAcceptedPurposes: givenAcceptedPurposes,
        newGlobalVendorList: givenNewGlobalVendorList,
        oldGlobalVendorList: givenOldGlobalVendorList
      }).then(function () {
        (0, _chai.expect)(saveVendorConsentsSpy.calledOnce, 'should call to save updated vendor consents').to.be.true;
        (0, _chai.expect)(saveVendorConsentsSpy.args[0][0].vendorConsents, 'should send the accepted vendor consents containing the new ones').to.include(395);
        (0, _chai.expect)(saveVendorConsentsSpy.args[0][0].vendorConsents.length, 'should contain 3 new accepted vendors').to.equal(givenNewGlobalVendorList.vendors.length);
        (0, _chai.expect)(saveVendorConsentsSpy.args[0][0].purposeConsents, 'should contain the same accepted purposes').to.deep.equal(givenAcceptedPurposes);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('Given consented vendors with a version list number that differs to the version list number of the global vendor list, and a list of allowed vendor ids, assuming that all new vendors are accepted (ALL_ALLOW option)', function () {
    it('Should save a new consent with the new vendors from the v74 list that are not in the v73', function (done) {
      var givenNewGlobalVendorList = _globalvendorlist.default;
      var givenOldGlobalVendorList = _globalvendorlist2.default;
      var givenAllowedVendorIds = givenNewGlobalVendorList.vendors.map(function (vendor) {
        return vendor.id;
      }).filter(function (id) {
        return id !== 395;
      });
      var givenAcceptedVendors = givenOldGlobalVendorList.vendors.map(function (vendor) {
        return vendor.id;
      });
      var givenAcceptedPurposes = givenOldGlobalVendorList.purposes.map(function (purpose) {
        return purpose.id;
      });
      var givenNewVendorsAcceptationOption = 'OPTION_ALL_ALLOW';
      var vendorConsentsRepositoryMock = {
        saveVendorConsents: function saveVendorConsents() {
          return Promise.resolve();
        }
      };

      var saveVendorConsentsSpy = _sinon.default.spy(vendorConsentsRepositoryMock, 'saveVendorConsents');

      var newVendorsStatusService = new _NewVendorsStatusService.NewVendorsStatusService({
        option: givenNewVendorsAcceptationOption
      });
      var service = new _UpdateConsentVendorsService.default({
        vendorConsentsRepository: vendorConsentsRepositoryMock,
        newVendorsStatusService: newVendorsStatusService
      });
      service.updateConsentVendorList({
        consentAcceptedVendors: givenAcceptedVendors,
        consentAcceptedPurposes: givenAcceptedPurposes,
        newGlobalVendorList: givenNewGlobalVendorList,
        oldGlobalVendorList: givenOldGlobalVendorList,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function () {
        (0, _chai.expect)(saveVendorConsentsSpy.calledOnce, 'should call to save updated vendor consents').to.be.true;
        (0, _chai.expect)(saveVendorConsentsSpy.args[0][0].vendorConsents, 'should not accept a non-allowed vendor id').to.not.include(395);
        (0, _chai.expect)(saveVendorConsentsSpy.args[0][0].vendorConsents.length, 'should contain 2 new accepted vendors (only allowed)').to.equal(givenAllowedVendorIds.length);
        (0, _chai.expect)(saveVendorConsentsSpy.args[0][0].purposeConsents, 'should contain the same accepted purposes').to.deep.equal(givenAcceptedPurposes);
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});