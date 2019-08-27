"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _LocalStorageBootstrap = _interopRequireDefault(require("../../../../cmp/infrastructure/bootstrap/LocalStorageBootstrap"));

var _jsdom = require("jsdom");

var _chai = require("chai");

describe('LocalStorageBootstrap Test', function () {
  describe('Given a Windows and a Configuration', function () {
    it('Should return promise when calling init method', function (done) {
      var givenWindow = new _jsdom.JSDOM('<!DOCTYPE html><div id="forlayo">I\'m BATMAN!</div>').window;
      var givenConfig = {
        consent: {
          cmpId: 42,
          cmpVersion: '1',
          consentScreen: 1,
          consentLanguage: 'es'
        },
        gdpr: {
          gdprApplies: true,
          storeConsentGlobally: false
        }
      };

      var initPromise = _LocalStorageBootstrap.default.init({
        window: givenWindow,
        config: givenConfig
      });

      (0, _chai.expect)(initPromise).instanceOf(Promise);
      done();
    });
  });
});