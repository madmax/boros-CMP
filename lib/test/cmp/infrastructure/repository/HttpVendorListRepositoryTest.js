"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _HttpVendorListRepository = _interopRequireDefault(require("../../../../cmp/infrastructure/repository/HttpVendorListRepository"));

describe('HttpVendorListRepository', function () {
  describe('getGlobalVendorList', function () {
    it('Should fetch the remote vendor list JSON, using the given vendor list location', function (done) {
      var givenVendorListHost = 'http://cmp.schibsted.com';
      var givenVendorListFilename = 'givenVendorList.json';
      var expectedUrl = 'http://cmp.schibsted.com/givenVendorList.json';
      var expectedResult = {
        key: 'value'
      };
      var fetchMock = {
        fetch: function fetch() {
          return {
            json: function json() {
              return expectedResult;
            },
            ok: true
          };
        }
      };

      var fetchSpy = _sinon.default.spy(fetchMock, 'fetch');

      var repository = new _HttpVendorListRepository.default({
        fetcher: fetchMock.fetch,
        vendorListFilename: givenVendorListFilename,
        vendorListHost: givenVendorListHost
      });
      repository.getGlobalVendorList().then(function (result) {
        (0, _chai.expect)(fetchSpy.calledOnce, 'should have called the remote fetch method').to.be.true;
        (0, _chai.expect)(fetchSpy.args[0][0], 'should retrieve the IAB vendor list by default').to.equal(expectedUrl);
        (0, _chai.expect)(result, 'should return the fetched value as json output format').to.deep.equal(expectedResult);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should throw a GlobalVendorListAccessError if the global vendor list cannot be fetched', function (done) {
      var givenVendorListHost = 'http://cmp.schibsted.com';
      var givenVendorListFilename = 'givenVendorList.json';
      var fetchMock = {
        fetch: function fetch() {
          return {
            json: function json() {
              return null;
            },
            ok: false
          };
        }
      };
      var repository = new _HttpVendorListRepository.default({
        fetcher: fetchMock.fetch,
        vendorListFilename: givenVendorListFilename,
        vendorListHost: givenVendorListHost
      });
      repository.getGlobalVendorList().then(function () {
        return done(new Error('should throw an error because the fetch response is not ok'));
      }).catch(function (e) {
        if (e.name === 'GlobalVendorListAccessError') {
          done();
        } else {
          throw new Error("should throw a GlobalVendorListAccessError instead of " + e.name);
        }
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});