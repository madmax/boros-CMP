"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeGlobalStoreTestClientCMP = exports.initializeLocalStoreTestClientCMP = void 0;

var _jsdom = require("jsdom");

var _CMPFacade = _interopRequireDefault(require("./application/CMPFacade"));

var _TestLocalStoreBootstrap = _interopRequireDefault(require("../cmp/infrastructure/bootstrap/TestLocalStoreBootstrap"));

var _TestGlobalStoreBootstrap = _interopRequireDefault(require("../cmp/infrastructure/bootstrap/TestGlobalStoreBootstrap"));

var initializeLocalStoreTestClientCMP = function initializeLocalStoreTestClientCMP() {
  var windowMock = new _jsdom.JSDOM('<!DOCTYPE html><div id="forlayo">I\'m BATMAN!</div>').window;
  return _TestLocalStoreBootstrap.default.init({
    window: windowMock,
    config: {
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
    }
  }).then(function (cmp) {
    return new _CMPFacade.default({
      cmp: cmp
    });
  });
};

exports.initializeLocalStoreTestClientCMP = initializeLocalStoreTestClientCMP;

var initializeGlobalStoreTestClientCMP = function initializeGlobalStoreTestClientCMP() {
  var windowMock = new _jsdom.JSDOM('<!DOCTYPE html><div id="forlayo">I\'m BATMAN!</div>').window;
  return _TestGlobalStoreBootstrap.default.init({
    window: windowMock,
    config: {
      consent: {
        cmpId: 42,
        cmpVersion: '1',
        consentScreen: 1,
        consentLanguage: 'es'
      },
      gdpr: {
        gdprApplies: true,
        storeConsentGlobally: true,
        globalConsentLocation: 'somewhere.html'
      }
    }
  }).then(function (cmp) {
    return new _CMPFacade.default({
      cmp: cmp
    });
  });
};

exports.initializeGlobalStoreTestClientCMP = initializeGlobalStoreTestClientCMP;