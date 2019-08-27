"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observerErrorThrown = exports.OBSERVER_ERROR_THROWN = void 0;
var OBSERVER_ERROR_THROWN = 'OBSERVER_ERROR_THROWN';
exports.OBSERVER_ERROR_THROWN = OBSERVER_ERROR_THROWN;

var observerErrorThrown = function observerErrorThrown(payload) {
  return {
    eventName: OBSERVER_ERROR_THROWN,
    payload: payload
  };
};

exports.observerErrorThrown = observerErrorThrown;