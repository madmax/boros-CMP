"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cmp = _interopRequireDefault(require("../../application/Cmp"));

var _windowCommunicationRegistry = _interopRequireDefault(require("../controller/windowCommunicationRegistry"));

var _createEvent = _interopRequireDefault(require("../createEvent"));

var _ContextLocalConsentContainer = _interopRequireDefault(require("../container/local/ContextLocalConsentContainer"));

var _registerCmpLocator = _interopRequireDefault(require("../controller/registerCmpLocator"));

var LocalStorageBootstrap =
/*#__PURE__*/
function () {
  function LocalStorageBootstrap() {}

  LocalStorageBootstrap.init = function init(_ref) {
    var window = _ref.window,
        config = _ref.config;
    return Promise.resolve().then(function () {
      return Promise.all([new _Cmp.default({
        container: _ContextLocalConsentContainer.default.context({
          config: config,
          window: window
        })
      }).commandConsumer(), (0, _registerCmpLocator.default)({
        dom: window.document
      })]);
    }).then(function (_ref2) {
      var cmp = _ref2[0],
          cmpLocatorIframe = _ref2[1];
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

  return LocalStorageBootstrap;
}();

exports.default = LocalStorageBootstrap;