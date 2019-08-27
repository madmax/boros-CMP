"use strict";

var _chai = require("chai");

var _NewVendorsStatusService = require("../../../../cmp/domain/vendor_consents/NewVendorsStatusService");

describe('NewVendorsStatusService', function () {
  var sampleArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  describe('OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE', function () {
    it('Should return true if all vendors were accepted', function (done) {
      var givenAcceptedVendorIds = sampleArray.slice(0, 5);
      var givenAllowedVendorIds = givenAcceptedVendorIds;
      var givenGlobalVendorIds = sampleArray;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be true').to.be.true;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return true if vendors were customized, but not all rejected', function (done) {
      var givenAcceptedVendorIds = sampleArray.slice(0, 5);
      var givenGlobalVendorIds = sampleArray;
      var givenAllowedVendorIds = givenGlobalVendorIds;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be true').to.be.true;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return false if vendors were all rejected', function (done) {
      var givenAcceptedVendorIds = [];
      var givenGlobalVendorIds = sampleArray;
      var givenAllowedVendorIds = givenGlobalVendorIds;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be false').to.be.false;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE', function () {
    it('Should return true if all vendors were accepted', function (done) {
      var givenAcceptedVendorIds = sampleArray.slice(0, 5);
      var givenAllowedVendorIds = givenAcceptedVendorIds;
      var givenGlobalVendorIds = sampleArray;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be true').to.be.true;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return false if vendors were customized, but not all rejected', function (done) {
      var givenAcceptedVendorIds = sampleArray.slice(0, 5);
      var givenGlobalVendorIds = sampleArray;
      var givenAllowedVendorIds = givenGlobalVendorIds;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be false').to.be.false;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return false if vendors were all rejected', function (done) {
      var givenAcceptedVendorIds = [];
      var givenGlobalVendorIds = sampleArray;
      var givenAllowedVendorIds = givenGlobalVendorIds;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be false').to.be.false;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('OPTION_ALL_DISMISS', function () {
    it('Should return false if all vendors were accepted', function (done) {
      var givenAcceptedVendorIds = sampleArray.slice(0, 5);
      var givenAllowedVendorIds = givenAcceptedVendorIds;
      var givenGlobalVendorIds = sampleArray;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_ALL_DISMISS
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be false').to.be.false;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return false if vendors were customized, but not all rejected', function (done) {
      var givenAcceptedVendorIds = sampleArray.slice(0, 5);
      var givenGlobalVendorIds = sampleArray;
      var givenAllowedVendorIds = givenGlobalVendorIds;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_ALL_DISMISS
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be false').to.be.false;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return false if vendors were all rejected', function (done) {
      var givenAcceptedVendorIds = [];
      var givenGlobalVendorIds = sampleArray;
      var givenAllowedVendorIds = givenGlobalVendorIds;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_ALL_DISMISS
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be false').to.be.false;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('OPTION_ALL_ALLOW', function () {
    it('Should return true if all vendors were accepted', function (done) {
      var givenAcceptedVendorIds = sampleArray.slice(0, 5);
      var givenAllowedVendorIds = givenAcceptedVendorIds;
      var givenGlobalVendorIds = sampleArray;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_ALL_ALLOW
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be true').to.be.true;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return false if vendors were customized, but not all rejected', function (done) {
      var givenAcceptedVendorIds = sampleArray.slice(0, 5);
      var givenGlobalVendorIds = sampleArray;
      var givenAllowedVendorIds = givenGlobalVendorIds;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_ALL_ALLOW
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be true').to.be.true;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should return false if vendors were all rejected', function (done) {
      var givenAcceptedVendorIds = [];
      var givenGlobalVendorIds = sampleArray;
      var givenAllowedVendorIds = givenGlobalVendorIds;
      var service = new _NewVendorsStatusService.NewVendorsStatusService({
        option: _NewVendorsStatusService.OPTION_ALL_ALLOW
      });
      service.getNewVendorsStatus({
        acceptedVendorIds: givenAcceptedVendorIds,
        globalVendorIds: givenGlobalVendorIds,
        allowedVendorIds: givenAllowedVendorIds
      }).then(function (newVendorsStatus) {
        (0, _chai.expect)(newVendorsStatus, 'should be true').to.be.true;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});