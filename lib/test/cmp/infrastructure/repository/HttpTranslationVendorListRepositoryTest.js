"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _globalvendorlist = _interopRequireDefault(require("../../../resources/globalvendorlist.json"));

var _purposesEs = _interopRequireDefault(require("../../../resources/purposes-es.json"));

var _HttpTranslationVendorListRepository = _interopRequireDefault(require("../../../../cmp/infrastructure/repository/HttpTranslationVendorListRepository"));

describe('HttpTranslationVendorListRepository', function () {
  describe('getGlobalVendorList', function () {
    it('should load the remote vendor list and the translation file for the vendor list version and the specified language', function (done) {
      var givenConsentLanguage = 'es';
      var givenVendorListVersion = 74;
      var expectedTranslationsUrl = 'https://vendorlist.consensu.org/v-74/purposes-es.json';
      var fetchTranslationMock = {
        fetch: function fetch() {
          return {
            json: function json() {
              return _purposesEs.default;
            },
            ok: true
          };
        }
      };

      var fetchTranslationSpy = _sinon.default.spy(fetchTranslationMock, 'fetch');

      var vendorListMock = {
        getGlobalVendorList: function getGlobalVendorList() {
          return Promise.resolve(_globalvendorlist.default);
        }
      };
      var repository = new _HttpTranslationVendorListRepository.default({
        fetcher: fetchTranslationMock.fetch,
        vendorListRepository: vendorListMock,
        consentLanguage: givenConsentLanguage
      });
      repository.getGlobalVendorList({
        vendorListVersion: givenVendorListVersion
      }).then(function (vendorList) {
        (0, _chai.expect)(vendorList.vendors).to.deep.equal(_globalvendorlist.default.vendors);
        (0, _chai.expect)(vendorList.purposes).to.deep.equal(_purposesEs.default.purposes);
        (0, _chai.expect)(vendorList.features).to.deep.equal(_purposesEs.default.features);
        (0, _chai.expect)(vendorList.vendorListVersion).to.deep.equal(_globalvendorlist.default.vendorListVersion);
        (0, _chai.expect)(fetchTranslationSpy.calledOnce).to.be.true;
        (0, _chai.expect)(fetchTranslationSpy.args[0][0], 'incorrect translations URL').to.equal(expectedTranslationsUrl);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('should load the remote vendor list without translation if the given language is not accepted', function (done) {
      var givenConsentLanguage = 'xx';
      var givenVendorListVersion = 74;
      var fetchTranslationMock = {
        fetch: function fetch() {
          return {
            json: function json() {
              return null;
            },
            ok: false
          };
        }
      };
      var vendorListMock = {
        getGlobalVendorList: function getGlobalVendorList() {
          return Promise.resolve(_globalvendorlist.default);
        }
      };
      var repository = new _HttpTranslationVendorListRepository.default({
        fetcher: fetchTranslationMock.fetch,
        vendorListRepository: vendorListMock,
        consentLanguage: givenConsentLanguage
      });
      repository.getGlobalVendorList({
        vendorListVersion: givenVendorListVersion
      }).then(function (vendorList) {
        (0, _chai.expect)(vendorList).to.deep.equal(_globalvendorlist.default);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
    it('should load the no-version translations if no vendor list version is specified', function (done) {
      var givenConsentLanguage = 'es';
      var givenVendorListVersion = undefined;
      var expectedTranslationsUrl = 'https://vendorlist.consensu.org/purposes-es.json';
      var fetchTranslationMock = {
        fetch: function fetch() {
          return {
            json: function json() {
              return _purposesEs.default;
            },
            ok: true
          };
        }
      };

      var fetchTranslationSpy = _sinon.default.spy(fetchTranslationMock, 'fetch');

      var vendorListMock = {
        getGlobalVendorList: function getGlobalVendorList() {
          return Promise.resolve(_globalvendorlist.default);
        }
      };
      var repository = new _HttpTranslationVendorListRepository.default({
        fetcher: fetchTranslationMock.fetch,
        vendorListRepository: vendorListMock,
        consentLanguage: givenConsentLanguage
      });
      repository.getGlobalVendorList({
        vendorListVersion: givenVendorListVersion
      }).then(function (vendorList) {
        (0, _chai.expect)(fetchTranslationSpy.calledOnce).to.be.true;
        (0, _chai.expect)(fetchTranslationSpy.args[0][0], 'incorrect translations URL').to.equal(expectedTranslationsUrl);
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});