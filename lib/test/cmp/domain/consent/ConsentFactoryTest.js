"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _globalvendorlist = _interopRequireDefault(require("../../../resources/globalvendorlist.json"));

var _globalvendorlist2 = _interopRequireDefault(require("../../../resources/globalvendorlist.75.json"));

var _ConsentFactory = _interopRequireDefault(require("../../../../cmp/domain/consent/ConsentFactory"));

var _DomainEventBus = _interopRequireDefault(require("../../../../cmp/domain/event_bus/DomainEventBus"));

var _globalVendorListVersionChanged = require("../../../../cmp/domain/consent/globalVendorListVersionChanged");

describe('ConsentFactory', function () {
  describe('createConsent', function () {
    it('Should return a ConsentString with a globalVendorList', function (done) {
      var givenGlobalVendorList = _globalvendorlist.default;
      var givenConsentStringData = 'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA';
      var vendorListRepositoryMock = {
        getGlobalVendorList: function getGlobalVendorList() {
          return Promise.resolve(givenGlobalVendorList);
        }
      };
      var factory = new _ConsentFactory.default({
        vendorListRepository: vendorListRepositoryMock
      });
      factory.createConsent({
        encodedConsent: givenConsentStringData,
        globalVendorList: givenGlobalVendorList
      }).then(function (consent) {
        (0, _chai.expect)(consent.getVendorListVersion(), 'consent has no valid vendor list version').to.equal(74);
        (0, _chai.expect)(consent.getCmpId(), 'consent has not parsed the string data').to.equal(1);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should notify that a consent is registered with an obsolete global vendor list version', function (done) {
      var givenGlobalVendorListLatest = _globalvendorlist2.default;
      var givenGlobalVendorListV74 = _globalvendorlist.default;
      var givenAllowedVendorIds = [1];
      var givenConsentStringData = 'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA';

      _DomainEventBus.default.clearAllObservers();

      var vendorListRepositoryMock = {
        getGlobalVendorList: function getGlobalVendorList(_ref) {
          var vendorListVersion = _ref.vendorListVersion;
          return Promise.resolve(vendorListVersion === 74 ? givenGlobalVendorListV74 : givenGlobalVendorListLatest);
        }
      };
      var factory = new _ConsentFactory.default({
        allowedVendorIds: givenAllowedVendorIds,
        vendorListRepository: vendorListRepositoryMock
      });

      _DomainEventBus.default.register({
        eventName: _globalVendorListVersionChanged.GLOBAL_VENDOR_LIST_VERSION_CHANGED,
        observer: function observer(_ref2) {
          var payload = _ref2.payload;
          Promise.resolve().then(function () {
            (0, _chai.expect)(payload.purposeConsents, 'the payload should have the accepted purposes').to.be.a('array');
            (0, _chai.expect)(payload.vendorConsents, 'the payload should have the accepted vendors').to.be.a('array');
            (0, _chai.expect)(payload.oldGlobalVendorList, 'the payload should have the obsolete vendors list').to.not.undefined;
            (0, _chai.expect)(payload.oldGlobalVendorList.vendorListVersion, 'the payload should have the obsolete vendors list').to.equal(74);
            (0, _chai.expect)(payload.newGlobalVendorList, 'the payload should have the new global vendor list to use').to.not.undefined;
            (0, _chai.expect)(payload.newGlobalVendorList.vendorListVersion, 'the payload should have the new global vendor list to use').to.equal(75);
            (0, _chai.expect)(payload.allowedVendorIds, 'the payload should have whitelisted accepted vendor ids').to.be.a('array');
            done();
          }).catch(function (e) {
            return done(e);
          });
        }
      });

      factory.createConsent({
        encodedConsent: givenConsentStringData
      }).catch(function (e) {
        return done(e);
      });
    });
    it('Should only download one vendorlist if the current version is the same as the actual one', function (done) {
      var givenConsentStringData = 'BOPmXwlOQETrjABABAESBK-AAAAcd7vf____79n_____9uz_Gv_rvf__33e8_39v_h_r_-___mf-3zV4-91vV11yPg1urXIr1FpjQ6MGgA';
      var newGlobalVendorList = _globalvendorlist.default;
      var vendorListRepositoryMock = {
        getGlobalVendorList: function getGlobalVendorList() {
          return newGlobalVendorList;
        }
      };

      var spyGetGlobalVendorList = _sinon.default.spy(vendorListRepositoryMock, 'getGlobalVendorList');

      var factory = new _ConsentFactory.default({
        vendorListRepository: vendorListRepositoryMock
      });
      factory.createConsent({
        encodedConsent: givenConsentStringData
      }).then(function () {
        (0, _chai.expect)(spyGetGlobalVendorList.calledOnce, 'the getGlobalVendorList method should be called only once').to.be.true;
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});