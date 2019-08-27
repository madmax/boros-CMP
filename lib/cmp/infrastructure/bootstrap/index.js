"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GlobalStorageBootstrap = _interopRequireDefault(require("./GlobalStorageBootstrap"));

var _LocalStorageBootstrap = _interopRequireDefault(require("./LocalStorageBootstrap"));

var Bootstrap =
/*#__PURE__*/
function () {
  function Bootstrap() {}

  Bootstrap.init = function init(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        config = _ref.config;

    switch (config && config.gdpr && config.gdpr.storeConsentGlobally) {
      case true:
        return _GlobalStorageBootstrap.default.init({
          config: config,
          window: window
        });

      case false:
        return _LocalStorageBootstrap.default.init({
          config: config,
          window: window
        });

      default:
        return _LocalStorageBootstrap.default.init({
          config: config,
          window: window
        });
    }
  };

  return Bootstrap;
}();

exports.default = Bootstrap;