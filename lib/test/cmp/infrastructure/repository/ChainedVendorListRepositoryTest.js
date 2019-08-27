"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _ChainedVendorListRepository = _interopRequireDefault(require("../../../../cmp/infrastructure/repository/ChainedVendorListRepository"));

var _InMemoryVendorListRepository = _interopRequireDefault(require("../../../../cmp/infrastructure/repository/InMemoryVendorListRepository"));

describe('ChainedVendorListRepository', function () {
  describe('getGlobalVendorList', function () {
    it('Should return the inmemory vendor list if it is found', function (done) {
      var expectedResult = {
        vendorListVersion: 65
      };
      var expectedVersion = 65;
      var inMemoryVendorListRepository = new _InMemoryVendorListRepository.default({
        initialVendorList: expectedResult
      });
      var httpVendorListRepositoryMock = {
        getGlobalVendorList: function getGlobalVendorList() {
          return Promise.resolve({
            vendorListVersion: 90
          });
        }
      };

      var httpGetGlobalVendorListSpy = _sinon.default.spy(httpVendorListRepositoryMock, 'getGlobalVendorList');

      var repository = new _ChainedVendorListRepository.default({
        inMemoryVendorListRepository: inMemoryVendorListRepository,
        httpVendorListRepository: httpVendorListRepositoryMock
      });
      repository.getGlobalVendorList().then(function (result) {
        (0, _chai.expect)(httpGetGlobalVendorListSpy.called, 'should have not called the http repository').to.be.false;
        (0, _chai.expect)(result, 'the resulting vendor list should be the inmemory vendor list').to.deep.equal(expectedResult);
        (0, _chai.expect)(inMemoryVendorListRepository.latestVersion, 'the resulting latest version is not the same').to.deep.equal(expectedVersion);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return the http vendor list if it is not found into the inmemory repository, and set it inmemory for next calls', function (done) {
      var expectedResult = {
        vendorListVersion: 65
      };
      var inMemoryVendorListRepository = new _InMemoryVendorListRepository.default();
      var httpVendorListRepositoryMock = {
        getGlobalVendorList: function getGlobalVendorList() {
          return Promise.resolve(expectedResult);
        }
      };

      var inMemorySetGlobalVendorListSpy = _sinon.default.spy(inMemoryVendorListRepository, 'setGlobalVendorList');

      var inMemoryGetGlobalVendorListSpy = _sinon.default.spy(inMemoryVendorListRepository, 'getGlobalVendorList');

      var repository = new _ChainedVendorListRepository.default({
        inMemoryVendorListRepository: inMemoryVendorListRepository,
        httpVendorListRepository: httpVendorListRepositoryMock
      });
      repository.getGlobalVendorList().then(function (result) {
        (0, _chai.expect)(inMemoryGetGlobalVendorListSpy.calledOnce, 'should have called the inmemory repository -get- to try to get the vendor list from there first').to.be.true;
        (0, _chai.expect)(result, 'the resulting vendor list should be the http vendor list').to.deep.equal(expectedResult);
        (0, _chai.expect)(inMemorySetGlobalVendorListSpy.calledOnce, 'should have called the set method of the inmemory repository').to.be.true;
        (0, _chai.expect)(inMemorySetGlobalVendorListSpy.args[0][0].globalVendorList, 'should store the http vendor list to the inmemory repository').to.deep.equal(expectedResult);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});