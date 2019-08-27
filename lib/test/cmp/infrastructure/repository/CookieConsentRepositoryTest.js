"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _CookieConsentRepository = _interopRequireDefault(require("../../../../cmp/infrastructure/repository/CookieConsentRepository"));

var _CookieHandler = _interopRequireDefault(require("../../../../cmp/infrastructure/service/CookieHandler"));

var _jsdom = require("jsdom");

describe('CookieConsentRepositoryTest', function () {
  describe('getConsent', function () {
    it('Should return undefined if there is no stored value into euconsent cookie', function (done) {
      var givenCookieValue = 'somecookie=BOPVloMOPVqFzABABAENA8AB-AAAE8A;anothercookie=BOPVloMOPVqFzABABAENA8AB-AAAE8A';
      var documentMock = {
        cookie: givenCookieValue
      };
      var cookieHandler = new _CookieHandler.default({
        dom: documentMock
      });
      var consentFactoryMock = {
        createConsent: function createConsent() {
          return Promise.resolve({});
        }
      };
      var repository = new _CookieConsentRepository.default({
        cookieHandler: cookieHandler,
        consentFactory: consentFactoryMock
      });
      repository.getConsent().then(function (consent) {
        (0, _chai.expect)(consent, 'there should be consent defined if there is no cookie').to.be.undefined;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return the ConsentString restored from the cookie which consent string is the cookie value', function (done) {
      var givenAllowedVendorIds = [1];
      var givenEuConsent = 'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA';
      var givenCookieValue = 'pubconsent=BOPVloMOPVqFzABABAENA8AB-AAAE8A; euconsent=' + givenEuConsent;
      var documentMock = {
        cookie: givenCookieValue
      };
      var cookieHandler = new _CookieHandler.default({
        dom: documentMock
      });
      var consentFactoryMock = {
        createConsent: function createConsent() {
          return Promise.resolve({
            getConsentString: function getConsentString() {
              return givenEuConsent;
            }
          });
        }
      };
      var repository = new _CookieConsentRepository.default({
        cookieHandler: cookieHandler,
        consentFactory: consentFactoryMock
      });
      repository.getConsent({
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (consent) {
        (0, _chai.expect)(consent.getConsentString(false), 'the consent string should be the same as the read one from the cookie').to.equal(givenEuConsent);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('saveConsent', function () {
    it('Should return true after cookie consent has been stored', function (done) {
      var givenEuConsent = 'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA';
      var givenDOM = new _jsdom.JSDOM('<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>').window.document;
      var cookieHandler = new _CookieHandler.default({
        dom: givenDOM
      });
      var consentMock = {
        getConsentString: function getConsentString() {
          return givenEuConsent;
        }
      };
      var consentFactoryMock = {
        createConsent: function createConsent() {
          return Promise.resolve({
            getConsentString: function getConsentString() {
              return givenEuConsent;
            }
          });
        }
      };
      var repository = new _CookieConsentRepository.default({
        cookieHandler: cookieHandler,
        consentFactory: consentFactoryMock
      });
      var expectedCookieValue = 'euconsent=BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA';
      repository.saveConsent({
        consent: consentMock
      }).then(function (data) {
        (0, _chai.expect)(data).to.be.true;
        (0, _chai.expect)(givenDOM.cookie).to.equal(expectedCookieValue);
        done();
      }).catch(function (e) {
        return done(new Error(e));
      });
    });
  });
});