"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWhitelisted = void 0;

var isWhitelisted = function isWhitelisted(_ref) {
  var whitelist = _ref.whitelist,
      id = _ref.id;
  return !whitelist || whitelist.indexOf(id) >= 0;
};

exports.isWhitelisted = isWhitelisted;