"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UnexistingConsentDataError = _interopRequireDefault(require("./UnexistingConsentDataError"));

var filterConsentMustExist = function filterConsentMustExist(consent) {
  if (!consent) {
    throw new _UnexistingConsentDataError.default();
  }

  return consent;
};

var _default = filterConsentMustExist;
exports.default = _default;