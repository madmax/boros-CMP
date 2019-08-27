"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _GetVendorConsentsUseCase = _interopRequireDefault(require("../../../cmp/application/services/vendor_consents/GetVendorConsentsUseCase"));

describe('Get Vendor Consents Use Case', function () {
  it('Should recover the stored VendorConsents if it was stored', function (done) {
    var givenVendorIds = [1];
    var vendorConsentsMock = {
      this_is_a: 'test_object'
    };
    var vendorConsentsRepositoryMock = {
      getVendorConsents: function getVendorConsents() {
        return vendorConsentsMock;
      }
    };
    var useCase = new _GetVendorConsentsUseCase.default({
      vendorConsentsRepository: vendorConsentsRepositoryMock
    });
    useCase.getVendorConsents({
      vendorIds: givenVendorIds
    }).then(function (vendorConsents) {
      (0, _chai.expect)(vendorConsents, 'should be the vendor consents obtained with the repository').to.deep.equal(vendorConsentsMock);
    }).then(function () {
      return done();
    }).catch(function (e) {
      return done(e);
    });
  });
  it('Should throw an UnexistingConsentDataError if there was no stored consent', function (done) {
    var vendorConsentsMock = undefined;
    var vendorConsentsRepositoryMock = {
      getVendorConsents: function getVendorConsents() {
        return vendorConsentsMock;
      }
    };
    var useCase = new _GetVendorConsentsUseCase.default({
      vendorConsentsRepository: vendorConsentsRepositoryMock
    });
    useCase.getVendorConsents().then(function () {
      return done(new Error('should have thrown an error'));
    }).catch(function (e) {
      (0, _chai.expect)(e.name, 'should throw an UnexistingConsentDataError').to.equal('UnexistingConsentDataError');
      done();
    }).catch(function (e) {
      return done(e);
    });
  });
});