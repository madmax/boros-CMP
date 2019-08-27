"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cmp = _interopRequireDefault(require("../../../../cmp/application/Cmp"));

var _TestGlobalStoreContainer = _interopRequireDefault(require("../container/TestGlobalStoreContainer"));

var _windowCommunicationRegistry = _interopRequireDefault(require("../../../../cmp/infrastructure/controller/windowCommunicationRegistry"));

var _IframeRegistry = _interopRequireDefault(require("../../../../cmp/infrastructure/service/IframeRegistry"));

var _fixJSDOMPostMessage = _interopRequireDefault(require("../controller/fixJSDOMPostMessage"));

var _index = _interopRequireDefault(require("../../../../globalstorage/infrastructure/bootstrap/index"));

/* eslint-disable no-console */
var GLOBAL_CONSENT_STORE_INITIALIZATION_ERROR = 'Error initializing global storage:';

var TestGlobalStoreBootstrap =
/*#__PURE__*/
function () {
  function TestGlobalStoreBootstrap() {}

  TestGlobalStoreBootstrap.init = function init(_ref) {
    var window = _ref.window,
        config = _ref.config;
    return Promise.resolve(config).then(function (config) {
      return registerIframe(window)(config);
    }).then(function (iframe) {
      return Promise.resolve().then(function () {
        return (0, _fixJSDOMPostMessage.default)({
          origin: window,
          target: iframe.contentWindow
        });
      }).then(function () {
        return (0, _index.default)(iframe.contentWindow);
      }).then(function () {
        return new _TestGlobalStoreContainer.default({
          config: config,
          window: window,
          iframe: iframe.contentWindow
        });
      });
    }).then(function (container) {
      return Promise.all([CMPFunctionalFacade(container), registerIframeCommunication(container)]);
    }).then(function (_ref2) {
      var cmp = _ref2[0],
          undefined = _ref2[1];
      return (0, _windowCommunicationRegistry.default)({
        cmp: cmp,
        window: window
      });
    });
  };

  return TestGlobalStoreBootstrap;
}();

exports.default = TestGlobalStoreBootstrap;

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