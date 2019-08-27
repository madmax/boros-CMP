"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _buildValidVendorConsents = _interopRequireDefault(require("../../../../cmp/application/services/vendor_consents/buildValidVendorConsents"));

describe('buildValidVendorConsents', function () {
  describe('Given a valid object populated with number keys and boolean values', function () {
    it('Should return an array with the id keys which values are evaluated to true', function (done) {
      var givenObject = {
        vendorConsents: {
          1: true,
          2: false,
          3: true,
          4: false,
          5: true
        },
        purposeConsents: {
          1: true,
          2: false,
          3: true
        }
      };
      var expectedResult = {
        vendorConsents: [1, 3, 5],
        purposeConsents: [1, 3]
      };
      (0, _buildValidVendorConsents.default)(givenObject).then(function (consents) {
        (0, _chai.expect)(consents, 'should contain the true valued keys').to.deep.equal(expectedResult);
        done();
      }).catch(function (error) {
        return done(new Error(error));
      });
    });
  });
  describe('Given an invalid object populated with data', function () {
    it('Should reject with an invalid format error', function (done) {
      var expectedError = 'VendorConsentsFormatError';
      var givenObject = {
        1: true,
        2: false,
        3: true,
        what: true,
        '4': true,
        5: 'not a boolean'
      };
      (0, _buildValidVendorConsents.default)(givenObject).then(function (consents) {
        done(new Error("done shouldn't be called with consents " + consents));
      }).catch(function (error) {
        (0, _chai.expect)(error.name, 'should be of type VendorConsentsFormatError').to.deep.equal(expectedError);
        done();
      });
    });
    it('Should reject with an invalid entry error', function (done) {
      var expectedError = 'VendorConsentsEntryError';
      var givenObject = {
        vendorConsents: {
          bad_key: true,
          2: false,
          3: true,
          4: false,
          5: true
        },
        purposeConsents: {
          1: 'wrong here',
          2: false,
          3: true
        }
      };
      (0, _buildValidVendorConsents.default)(givenObject).then(function (consents) {
        done(new Error("done shouldn't be called with consents " + Object.entries(consents)));
      }).catch(function (error) {
        (0, _chai.expect)(error.name, 'should be of type VendorConsentsEntryError').to.deep.equal(expectedError);
        done();
      });
    });
  });
});