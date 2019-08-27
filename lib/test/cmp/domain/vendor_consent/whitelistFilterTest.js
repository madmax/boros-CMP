"use strict";

var _chai = require("chai");

var _whitelistFilter = require("../../../../cmp/domain/vendor_consents/whitelistFilter");

describe('whitelistFilter', function () {
  describe('isWhitelisted, given an empty whitelist', function () {
    it('Should return true', function () {
      var givenId = 2;
      var givenWhitelist = undefined;
      (0, _chai.expect)((0, _whitelistFilter.isWhitelisted)({
        whitelist: givenWhitelist,
        id: givenId
      }), 'id should be whitelisted').to.be.true;
    });
  });
  describe('isWhitelisted, given a whitelist', function () {
    it('Should return true if the id is into the whitelist', function () {
      var givenId = 2;
      var givenWhitelist = [1, 2, 3];
      (0, _chai.expect)((0, _whitelistFilter.isWhitelisted)({
        whitelist: givenWhitelist,
        id: givenId
      }), 'id should be whitelisted').to.be.true;
    });
    it('Should return false if the id is not into the whitelist', function () {
      var givenId = 4;
      var givenWhitelist = [1, 2, 3];
      (0, _chai.expect)((0, _whitelistFilter.isWhitelisted)({
        whitelist: givenWhitelist,
        id: givenId
      }), 'id should not be whitelisted').to.be.false;
    });
  });
});