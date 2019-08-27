"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaults = require("../../configuration/defaults");

var _DebugLocalConsentContainer = _interopRequireDefault(require("./DebugLocalConsentContainer"));

var _LocalConsentContainer = _interopRequireDefault(require("./LocalConsentContainer"));

var ContextLocalConsentContainer =
/*#__PURE__*/
function () {
  function ContextLocalConsentContainer() {}

  ContextLocalConsentContainer.context = function context(_ref) {
    var config = _ref.config,
        window = _ref.window;

    if (window.document.location.search.indexOf(_defaults.DEFAULT_DEBUG_KEYWORD) !== -1 || config && config.log) {
      return new _DebugLocalConsentContainer.default({
        config: config,
        window: window
      });
    } else {
      return new _LocalConsentContainer.default({
        config: config || {},
        window: window
      });
    }
  };

  return ContextLocalConsentContainer;
}();

exports.default = ContextLocalConsentContainer;