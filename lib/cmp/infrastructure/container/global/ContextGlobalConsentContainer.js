"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DebugGlobalConsentContainer = _interopRequireDefault(require("./DebugGlobalConsentContainer"));

var _GlobalConsentContainer = _interopRequireDefault(require("./GlobalConsentContainer"));

var _defaults = require("../../configuration/defaults");

var ContextGlobalConsentContainer =
/*#__PURE__*/
function () {
  function ContextGlobalConsentContainer() {}

  ContextGlobalConsentContainer.context = function context(_ref) {
    var window = _ref.window,
        config = _ref.config,
        iframe = _ref.iframe;

    if (window.document.location.search.indexOf(_defaults.DEFAULT_DEBUG_KEYWORD) !== -1 || config && config.log) {
      return new _DebugGlobalConsentContainer.default({
        config: config,
        window: window,
        iframe: iframe
      });
    } else {
      return new _GlobalConsentContainer.default({
        config: config || {},
        window: window,
        iframe: iframe
      });
    }
  };

  return ContextGlobalConsentContainer;
}();

exports.default = ContextGlobalConsentContainer;