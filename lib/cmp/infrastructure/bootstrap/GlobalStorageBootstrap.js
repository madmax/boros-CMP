"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cmp = _interopRequireDefault(require("../../application/Cmp"));

var _windowCommunicationRegistry = _interopRequireDefault(require("../controller/windowCommunicationRegistry"));

var _createEvent = _interopRequireDefault(require("../createEvent"));

var _IframeRegistry = _interopRequireDefault(require("../service/IframeRegistry"));

var _registerCmpLocator = _interopRequireDefault(require("../controller/registerCmpLocator"));

var _ContextGlobalConsentContainer = _interopRequireDefault(require("../container/global/ContextGlobalConsentContainer"));

/* eslint-disable no-console */
var GLOBAL_CONSENT_STORE_INITIALIZATION_ERROR = 'Error initializing global storage:';

var GlobalStorageBootstrap =
/*#__PURE__*/
function () {
  function GlobalStorageBootstrap() {}

  GlobalStorageBootstrap.init = function init(_ref) {
    var window = _ref.window,
        config = _ref.config;
    return Promise.resolve(config).then(function (config) {
      return Promise.all([registerIframe(window)(config), (0, _registerCmpLocator.default)({
        dom: window.document
      })]);
    }).then(function (_ref2) {
      var iframe = _ref2[0],
          cmpLocatorIframe = _ref2[1];
      return _ContextGlobalConsentContainer.default.context({
        window: window,
        config: config,
        iframe: iframe
      });
    }).then(function (container) {
      return Promise.all([CMPFunctionalFacade(container), registerIframeCommunication(container)]);
    }).then(function (_ref3) {
      var cmp = _ref3[0],
          undefined = _ref3[1];
      return (0, _windowCommunicationRegistry.default)({
        cmp: cmp,
        window: window
      });
    }).then(function () {
      return (0, _createEvent.default)({
        window: window,
        name: 'cmpReady'
      });
    });
  };

  return GlobalStorageBootstrap;
}();

exports.default = GlobalStorageBootstrap;

var registerIframeCommunication = function registerIframeCommunication(container) {
  return container.getInstance({
    key: 'IframeCommunication'
  }).register();
};

var registerIframe = function registerIframe(window) {
  return function (config) {
    return new _IframeRegistry.default({
      dom: window.document
    }).register({
      url: config.gdpr.globalConsentLocation
    }).catch(function (error) {
      return console.error(GLOBAL_CONSENT_STORE_INITIALIZATION_ERROR, error);
    });
  };
};

var CMPFunctionalFacade = function CMPFunctionalFacade(container) {
  return new _Cmp.default({
    container: container
  }).commandConsumer();
};