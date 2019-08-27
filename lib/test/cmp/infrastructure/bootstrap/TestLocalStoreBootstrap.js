"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cmp = _interopRequireDefault(require("../../../../cmp/application/Cmp"));

var _windowCommunicationRegistry = _interopRequireDefault(require("../../../../cmp/infrastructure/controller/windowCommunicationRegistry"));

var _TestLocalStoreContainer = _interopRequireDefault(require("../container/TestLocalStoreContainer"));

var TestLocalStoreBootstrap =
/*#__PURE__*/
function () {
  function TestLocalStoreBootstrap() {}

  TestLocalStoreBootstrap.init = function init(_ref) {
    var window = _ref.window,
        config = _ref.config;
    return Promise.resolve().then(function () {
      return new _Cmp.default({
        container: new _TestLocalStoreContainer.default({
          config: config,
          window: window
        })
      }).commandConsumer();
    }).then(function (cmp) {
      return (0, _windowCommunicationRegistry.default)({
        cmp: cmp,
        window: window
      });
    });
  };

  return TestLocalStoreBootstrap;
}();

exports.default = TestLocalStoreBootstrap;