"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var fixJsdomPostMessageWithEventSource = function fixJsdomPostMessageWithEventSource(_ref) {
  var origin = _ref.origin,
      target = _ref.target;

  target.postMessage = function (message) {
    var event = new target.MessageEvent('message', {
      data: message,
      source: origin
    });
    event.initEvent('message', false, false);
    setTimeout(function () {
      target.dispatchEvent(event);
    }, 0);
  };
};

var _default = fixJsdomPostMessageWithEventSource;
exports.default = _default;