"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _SetVendorConsentsUseCase = _interopRequireDefault(require("../../../cmp/application/services/vendor_consents/SetVendorConsentsUseCase"));

describe('SetVendorConsentsUseCase', function () {
  it('Should save the received VendorConsents', function (done) {
    var givenVendorConsents = {
      vendorConsents: [1, 3],
      purposeConsents: [1]
    };
    var expectedVendorsToSave = [1, 3];
    var expectedPurposesToSave = [1];
    var vendorConsentsRepositoryMock = {
      saveVendorConsents: function saveVendorConsents() {
        return Promise.resolve();
      }
    };

    var saveVendorConsentsSpy = _sinon.default.spy(vendorConsentsRepositoryMock, 'saveVendorConsents');

    var useCase = new _SetVendorConsentsUseCase.default({
      vendorConsentsRepository: vendorConsentsRepositoryMock
    });
    useCase.setVendorConsents({
      vendorConsents: givenVendorConsents
    }).then(function () {
      (0, _chai.expect)(saveVendorConsentsSpy.calledOnce, 'should call to save the vendor consents').to.be.true;
      (0, _chai.expect)(saveVendorConsentsSpy.args[0][0].vendorConsents, 'should receive the vendor consents array to save').to.deep.equal(expectedVendorsToSave);
      (0, _chai.expect)(saveVendorConsentsSpy.args[0][0].purposeConsents, 'should receive the vendor purposes array to save').to.deep.equal(expectedPurposesToSave);
    }).then(function () {
      return done();
    }).catch(function (e) {
      return done(e);
    });
  });
});