"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./cmp/infrastructure/event-polyfill");

var _bootstrap = _interopRequireDefault(require("./cmp/infrastructure/bootstrap"));

/* eslint-disable no-undef */
var _default = _bootstrap.default;
exports.default = _default;