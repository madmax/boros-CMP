"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _GetConsentStatusUseCase = _interopRequireDefault(require("../../../cmp/application/services/consent/GetConsentStatusUseCase"));

describe('GetConsentStatusUseCase', function () {
  describe('getConsentStatus', function () {
    it('Should return ACCEPTED if the cookie exists', function (done) {
      var expectedResult = 'ACCEPTED';
      var givenConsentData = 'BOPVloMOPi60FABABAENBA-AAAAcF7_______9______9uz_Gv_r_f__33e8_39v_h_7_-___m_-3zV4-_lvR11yPA1OrfIrwFhiAwAA';
      var consentRepositoryMock = {
        getConsent: function getConsent() {
          return Promise.resolve(givenConsentData);
        }
      };
      var getConsentStatusUseCase = new _GetConsentStatusUseCase.default({
        consentRepository: consentRepositoryMock
      });
      getConsentStatusUseCase.getConsentStatus().then(function (result) {
        (0, _chai.expect)(result, 'Value does not match with the expected.').equal(expectedResult);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return NON_ACCEPTED if the cookie does not exists', function (done) {
      var expectedResult = 'NOT_ACCEPTED';
      var givenConsentData = undefined;
      var consentRepositoryMock = {
        getConsent: function getConsent() {
          return Promise.resolve(givenConsentData);
        }
      };
      var getConsentStatusUseCase = new _GetConsentStatusUseCase.default({
        consentRepository: consentRepositoryMock
      });
      getConsentStatusUseCase.getConsentStatus().then(function (result) {
        (0, _chai.expect)(result, 'Value does not match with the expected.').equal(expectedResult);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});