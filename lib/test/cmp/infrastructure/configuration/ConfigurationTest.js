"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _Configuration = _interopRequireDefault(require("../../../../cmp/infrastructure/configuration/Configuration"));

var _defaults = require("../../../../cmp/infrastructure/configuration/defaults");

var _NewVendorsStatusService = require("../../../../cmp/domain/vendor_consents/NewVendorsStatusService");

var _internals = require("../../../../cmp/infrastructure/configuration/internals");

describe('Configuration', function () {
  describe('given an empty configuration objects', function () {
    it('Should be initialized with default values', function () {
      var configuration = new _Configuration.default();
      var expectedConfiguration = {
        gdpr: {
          gdprApplies: _defaults.DEFAULT_GDPR_APPLIES,
          globalConsentLocation: undefined,
          storeConsentGlobally: _defaults.DEFAULT_GDPR_STORE_CONSENT_GLOBALLY
        },
        consent: {
          cmpId: _internals.CMP_ID,
          cmpVersion: undefined,
          consentScreen: _defaults.DEFAULT_CONSENT_SCREEN,
          consentLanguage: _defaults.DEFAULT_CONSENT_LANGUAGE,
          allowedVendorIds: undefined,
          newVendorsStatusOption: _NewVendorsStatusService.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
        },
        vendorList: {
          host: _defaults.DEFAULT_VENDOR_LIST_HOST,
          filename: _defaults.DEFAULT_VENDOR_LIST_FILENAME
        },
        log: {
          level: _defaults.DEFAULT_LOG_LEVEL
        }
      };
      (0, _chai.expect)(configuration.gdpr, 'gdpr should have been initialized with default values').to.deep.equal(expectedConfiguration.gdpr);
      (0, _chai.expect)(configuration.consent, 'consent should have been initialized with default values').to.deep.equal(expectedConfiguration.consent);
      (0, _chai.expect)(configuration.vendorList, 'vendorList should have been initialized with default values').to.deep.equal(expectedConfiguration.vendorList);
      (0, _chai.expect)(configuration.log, 'log should have been initialized with default values').to.deep.equal(expectedConfiguration.log);
    });
  });
  describe('given configuration objects', function () {
    it('Should be initialized with the received values', function () {
      var givenGdpr = {
        gdprApplies: true,
        globalConsentLocation: 'https://what.ever.com/iframe.html',
        storeConsentGlobally: true
      };
      var givenConsent = {
        consentScreen: 3,
        consentLanguage: 'es',
        allowedVendorIds: [1],
        newVendorsStatusOption: _NewVendorsStatusService.OPTION_ALL_ALLOW
      };
      var givenVendorList = {
        host: 'http://consents.schibsted.com'
      };
      var givenLog = {
        level: _defaults.DEFAULT_LOG_LEVEL
      };
      var configuration = new _Configuration.default({
        gdpr: givenGdpr,
        consent: givenConsent,
        vendorList: givenVendorList,
        log: givenLog
      });
      var expectedConfiguration = {
        gdpr: givenGdpr,
        consent: {
          cmpId: _internals.CMP_ID,
          cmpVersion: undefined,
          consentScreen: givenConsent.consentScreen,
          consentLanguage: givenConsent.consentLanguage,
          allowedVendorIds: givenConsent.allowedVendorIds,
          newVendorsStatusOption: givenConsent.newVendorsStatusOption
        },
        vendorList: {
          host: givenVendorList.host,
          filename: _defaults.DEFAULT_VENDOR_LIST_FILENAME
        },
        log: givenLog
      };
      (0, _chai.expect)(configuration.gdpr, 'gdpr should have been initialized with received values').to.deep.equal(expectedConfiguration.gdpr);
      (0, _chai.expect)(configuration.consent, 'consent should have been initialized with received values').to.deep.equal(expectedConfiguration.consent);
      (0, _chai.expect)(configuration.vendorList, 'vendorList should have been initialized with received values').to.deep.equal(expectedConfiguration.vendorList);
      (0, _chai.expect)(configuration.log, 'log should have been initialized with received values').to.deep.equal(expectedConfiguration.log);
    });
    it('Should fill missing values with defaults', function () {
      var givenGdpr = {
        storeConsentGlobally: true,
        globalConsentLocation: 'https://what.ever.com/iframe.html'
      };
      var givenConsent = {
        consentLanguage: 'es'
      };
      var configuration = new _Configuration.default({
        gdpr: givenGdpr,
        consent: givenConsent
      });
      var expectedConfiguration = {
        gdpr: {
          gdprApplies: _defaults.DEFAULT_GDPR_APPLIES,
          globalConsentLocation: 'https://what.ever.com/iframe.html',
          storeConsentGlobally: givenGdpr.storeConsentGlobally
        },
        consent: {
          cmpId: _internals.CMP_ID,
          cmpVersion: undefined,
          consentScreen: _defaults.DEFAULT_CONSENT_SCREEN,
          consentLanguage: givenConsent.consentLanguage,
          allowedVendorIds: undefined,
          newVendorsStatusOption: _NewVendorsStatusService.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE
        },
        vendorList: {
          host: _defaults.DEFAULT_VENDOR_LIST_HOST,
          filename: _defaults.DEFAULT_VENDOR_LIST_FILENAME
        },
        log: {
          level: _defaults.DEFAULT_LOG_LEVEL
        }
      };
      (0, _chai.expect)(configuration.gdpr, 'gdpr should have been filled with default values').to.deep.equal(expectedConfiguration.gdpr);
      (0, _chai.expect)(configuration.consent, 'consent should have been filled with default values').to.deep.equal(expectedConfiguration.consent);
      (0, _chai.expect)(configuration.vendorList, 'vendorList should have been filled with default values').to.deep.equal(expectedConfiguration.vendorList);
      (0, _chai.expect)(configuration.log, 'log should have been filled with default values').to.deep.equal(expectedConfiguration.log);
    });
  });
});