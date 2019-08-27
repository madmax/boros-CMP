"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _globalvendorlist = _interopRequireDefault(require("../../../resources/globalvendorlist.json"));

var _ConsentStringVendorConsentsRepository = _interopRequireDefault(require("../../../../cmp/infrastructure/repository/ConsentStringVendorConsentsRepository"));

describe('ConsentStringVendorConsentsRepository', function () {
  describe('getVendorConsents', function () {
    it('Should return undefined if there is no stored consent', function (done) {
      var vendorListRepositoryMock = {
        getGlobalVendorList: _sinon.default.spy()
      };
      var vendorConsentsFactoryMock = {};
      var consentRepositoryMock = {
        getConsent: function getConsent() {
          return Promise.resolve(undefined);
        }
      };
      var repository = new _ConsentStringVendorConsentsRepository.default({
        vendorConsentsFactory: vendorConsentsFactoryMock,
        consentRepository: consentRepositoryMock,
        vendorListRepository: vendorListRepositoryMock,
        cmpId: 1,
        cmpVersion: 1,
        consentScreen: 3,
        consentLanguage: 'en'
      });
      repository.getVendorConsents().then(function (vendorConsents) {
        (0, _chai.expect)(vendorConsents, 'there should be no vendor consents defined if there is no cookie').to.be.undefined;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return the VendorConsents restored with the cookie, the vendor list and the allowed vendor ids', function (done) {
      var givenAllowedVendorIds = [1];
      var givenGlobalVendorList = {
        vendorListVersion: 1
      };
      var vendorListRepositoryMock = {
        getGlobalVendorList: function getGlobalVendorList() {
          return givenGlobalVendorList;
        }
      };
      var givenConsent = {
        a: 'test'
      };
      var vendorConsentsMock = {
        this: 'is',
        just: 'a',
        test: 'object'
      };
      var vendorConsentsFactoryMock = {
        createVendorConsents: function createVendorConsents() {
          return vendorConsentsMock;
        }
      };

      var createFromConsentSpy = _sinon.default.spy(vendorConsentsFactoryMock, 'createVendorConsents');

      var consentRepositoryMock = {
        getConsent: function getConsent() {
          return Promise.resolve(givenConsent);
        }
      };
      var repository = new _ConsentStringVendorConsentsRepository.default({
        vendorConsentsFactory: vendorConsentsFactoryMock,
        consentRepository: consentRepositoryMock,
        vendorListRepository: vendorListRepositoryMock,
        cmpId: 1,
        cmpVersion: 1,
        consentScreen: 3,
        consentLanguage: 'en'
      });
      repository.getVendorConsents({
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (vendorConsents) {
        (0, _chai.expect)(vendorConsents, 'should return a VendorConsents object created with the factory').to.deep.equal(vendorConsentsMock);
        (0, _chai.expect)(createFromConsentSpy.args[0][0].consent, 'the consent to restore the VendorConsents should be the consent restored from the consent repository').to.deep.equal(givenConsent);
        (0, _chai.expect)(createFromConsentSpy.args[0][0].globalVendorList, 'the vendor list to restore the VendorConsents should be the retrieved by the vendor list repository').to.deep.equal(givenGlobalVendorList);
        (0, _chai.expect)(createFromConsentSpy.args[0][0].allowedVendorIds, 'the allowed vendor ids to restore the VendorConsents should be the received as parameter').to.deep.equal(givenAllowedVendorIds);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('saveVendorConsents', function () {
    it('Should transform the vendor consents input to an encoded string to save it into the cookie', function (done) {
      var givenCmpId = 1;
      var givenCmpVersion = 1;
      var givenConsentLanguage = 'es';
      var givenConsentScreen = 0;
      var givenGlobalVendorList = _globalvendorlist.default;
      var givenDisallowedVendors = [9, 14, 47, 57, 58, 137, 141, 231, 272, 293, 298, 318, 336, 340, 346, 365, 381, 388, 395, 397, 410, 412, 423, 425, 430, 431, 444, 447, 454, 455];
      var givenAllowedVendors = givenGlobalVendorList.vendors.map(function (v) {
        return v.id;
      }).filter(function (id) {
        return !givenDisallowedVendors.includes(id);
      });
      var givenAllowedPurposes = [1, 2, 3, 4, 5];
      var vendorConsentsFactoryMock = {};
      var consentRepositoryMock = {
        saveConsent: function saveConsent() {
          return Promise.resolve();
        }
      };
      var vendorListRepositoryMock = {
        getGlobalVendorList: function getGlobalVendorList() {
          return Promise.resolve(givenGlobalVendorList);
        }
      };

      var saveConsentSpy = _sinon.default.spy(consentRepositoryMock, 'saveConsent');

      var repository = new _ConsentStringVendorConsentsRepository.default({
        vendorConsentsFactory: vendorConsentsFactoryMock,
        consentRepository: consentRepositoryMock,
        vendorListRepository: vendorListRepositoryMock,
        cmpId: givenCmpId,
        cmpVersion: givenCmpVersion,
        consentLanguage: givenConsentLanguage,
        consentScreen: givenConsentScreen
      });
      var expectedConsentStringShoudEndWith = 'BABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA';
      repository.saveVendorConsents({
        vendorConsents: givenAllowedVendors,
        purposeConsents: givenAllowedPurposes
      }).then(function () {
        (0, _chai.expect)(saveConsentSpy.calledOnce, 'should have called to save the consent string into the cookie').to.be.true;
        (0, _chai.expect)(saveConsentSpy.args[0][0].consent, 'should have received the string consent as parameter').to.not.undefined;
        (0, _chai.expect)(saveConsentSpy.args[0][0].consent.getConsentString().endsWith(expectedConsentStringShoudEndWith), 'should receive a consent having the correct encoded metadata, purposes and vendors (aware of the update date)').to.not.undefined;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});