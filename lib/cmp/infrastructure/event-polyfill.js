"use strict";

if (typeof window !== 'undefined' && typeof window.CustomEvent !== 'function') {
  var CustomEvent = function CustomEvent(event, params) {
    var eventParams = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
}