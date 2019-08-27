"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugObserverFactory = void 0;

var debugObserverFactory = function debugObserverFactory(logger) {
  return function (_ref) {
    var event = _ref.event,
        payload = _ref.payload,
        dispatcher = _ref.dispatcher;
    return logger.debug('DEBUG | event:', event, payload);
  };
};

exports.debugObserverFactory = debugObserverFactory;