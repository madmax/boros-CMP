"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _InMemoryVendorListRepository = _interopRequireDefault(require("../../../../cmp/infrastructure/repository/InMemoryVendorListRepository"));

describe('InMemoryVendorListRepository', function () {
  describe('getGlobalVendorList', function () {
    it('Should return undefined if no globalVendorList is set', function (done) {
      var repository = new _InMemoryVendorListRepository.default();
      repository.getGlobalVendorList().then(function (result) {
        (0, _chai.expect)(result, 'the global vendor list should be undefined').to.be.undefined;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return the stored globalVendorList if is set', function (done) {
      var givenGlobalVendorList = {
        vendorListVersion: 1
      };
      var repository = new _InMemoryVendorListRepository.default({
        initialVendorList: givenGlobalVendorList
      });
      repository.getGlobalVendorList().then(function (result) {
        (0, _chai.expect)(result, 'the global vendor list should be the given vendor list').to.deep.equal(givenGlobalVendorList);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return the global vendor list with a specific version number', function (done) {
      var givenGlobalVendorList = {
        vendorListVersion: 4
      };
      var repository = new _InMemoryVendorListRepository.default({
        initialVendorList: givenGlobalVendorList
      });
      repository.getGlobalVendorList({
        vendorListVersion: 4
      }).then(function (result) {
        (0, _chai.expect)(result, 'the global vendor list should be the given vendor list').to.deep.equal(givenGlobalVendorList);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('setGlobalVendorList', function () {
    it('Should update the stored global vendor list', function (done) {
      var givenInitialGlobalVendorList = {
        vendorListVersion: 1
      };
      var givenUpdatedGlobalVendorList = {
        vendorListVersion: 2
      };
      var repository = new _InMemoryVendorListRepository.default({
        initialVendorList: givenInitialGlobalVendorList
      });
      repository.setGlobalVendorList({
        globalVendorList: givenUpdatedGlobalVendorList
      }).then(function () {
        return repository.getGlobalVendorList();
      }).then(function (result) {
        (0, _chai.expect)(result, 'the global vendor list should be the updated vendor list').to.deep.equal(givenUpdatedGlobalVendorList);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});