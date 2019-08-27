"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorObserverFactory = void 0;

var errorObserverFactory = function errorObserverFactory(logger) {
  return function (_ref) {
    var payload = _ref.payload,
        dispatcher = _ref.dispatcher;
    return logger.error('ERROR | ', payload);
  };
};

exports.errorObserverFactory = errorObserverFactory;