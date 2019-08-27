"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var registerWindowCMP = function registerWindowCMP(_ref) {
  var cmp = _ref.cmp,
      window = _ref.window;
  return Promise.resolve().then(function () {
    return window.__cmp = cmp;
  });
};

var _default = registerWindowCMP;
exports.default = _default;