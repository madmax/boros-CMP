"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _globalStorage = _interopRequireDefault(require("../../application/globalStorage"));

var _CookieHandler = _interopRequireDefault(require("../../../cmp/infrastructure/service/CookieHandler"));

var _ReadCookieUseCase = _interopRequireDefault(require("../../application/service/ReadCookieUseCase"));

var _WriteCookieUseCase = _interopRequireDefault(require("../../application/service/WriteCookieUseCase"));

var bootstrap = function bootstrap(window) {
  return Promise.resolve(window).then(function (window) {
    return Promise.resolve(new _CookieHandler.default({
      dom: window.document
    })).then(function (cookieHandler) {
      return Promise.all([new _ReadCookieUseCase.default({
        cookieHandler: cookieHandler
      }), new _WriteCookieUseCase.default({
        cookieHandler: cookieHandler,
        domain: window.location.hostname
      })]).then(function (_ref) {
        var readCookieUseCase = _ref[0],
            writeCookieUseCase = _ref[1];
        return (0, _globalStorage.default)({
          window: window,
          readCookieUseCase: readCookieUseCase,
          writeCookieUseCase: writeCookieUseCase
        });
      });
    });
  });
};

var _default = bootstrap;
exports.default = _default;