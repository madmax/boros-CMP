"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _GetConsentDataUseCase = _interopRequireDefault(require("../../../cmp/application/services/consent/GetConsentDataUseCase"));

var _sinon = _interopRequireDefault(require("sinon"));

var _chai = require("chai");

describe('GetConsentDataUseCase', function () {
  describe('getConsentData', function () {
    it('Should return the stored consent string', function (done) {
      var givenGdprApplies = true;
      var givenHasGlobalScope = false;
      var givenConsentString = 'whatever';
      var givenConsent = {
        getConsentString: function getConsentString() {
          return givenConsentString;
        }
      };
      var consentRepositoryMock = {
        getConsent: function getConsent() {
          return Promise.resolve(givenConsent);
        }
      };

      var getConsentSpy = _sinon.default.spy(consentRepositoryMock, 'getConsent');

      var getConsentDataUseCase = new _GetConsentDataUseCase.default({
        consentRepository: consentRepositoryMock,
        gdprApplies: givenGdprApplies,
        hasGlobalScope: givenHasGlobalScope
      });
      getConsentDataUseCase.getConsentData().then(function (result) {
        (0, _chai.expect)(getConsentSpy.calledOnce, 'should have retrieved the consent from the repository').to.be.true;
        (0, _chai.expect)(result.consentData, 'Value does not match with the expected.').equal(givenConsentString);
        (0, _chai.expect)(result.hasGlobalScope, 'Value does not match with the expected.').equal(givenHasGlobalScope);
        (0, _chai.expect)(result.gdprApplies, 'Value does not match with the expected.').equal(givenGdprApplies);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return undefined consentData if no consent is set yet', function (done) {
      var givenGdprApplies = true;
      var givenHasGlobalScope = false;
      var consentRepositoryMock = {
        getConsent: function getConsent() {
          return Promise.resolve(undefined);
        }
      };
      var getConsentDataUseCase = new _GetConsentDataUseCase.default({
        consentRepository: consentRepositoryMock,
        gdprApplies: givenGdprApplies,
        hasGlobalScope: givenHasGlobalScope
      });
      getConsentDataUseCase.getConsentData().then(function (result) {
        (0, _chai.expect)(result.consentData, 'Value does not match with the expected.').equal(undefined);
        (0, _chai.expect)(result.hasGlobalScope, 'Value does not match with the expected.').equal(givenHasGlobalScope);
        (0, _chai.expect)(result.gdprApplies, 'Value does not match with the expected.').equal(givenGdprApplies);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});