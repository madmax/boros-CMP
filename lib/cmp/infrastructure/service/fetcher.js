"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetcherFactory = void 0;

var _isomorphicUnfetch = _interopRequireDefault(require("isomorphic-unfetch"));

var fetcherFactory = function fetcherFactory() {
  return function (url, options) {
    return (0, _isomorphicUnfetch.default)(url, options);
  };
};

exports.fetcherFactory = fetcherFactory;