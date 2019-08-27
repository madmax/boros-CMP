"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-undef */
var createEvent = function createEvent(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      window = _ref.window,
      name = _ref.name,
      _ref$detail = _ref.detail,
      detail = _ref$detail === void 0 ? {} : _ref$detail;

  window.document.dispatchEvent(new CustomEvent(name, {
    detail: detail
  }));
};

var _default = createEvent;
exports.default = _default;