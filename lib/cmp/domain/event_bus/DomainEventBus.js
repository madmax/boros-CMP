"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _observerErrorThrown = require("./observerErrorThrown");

var DomainEventBus =
/*#__PURE__*/
function () {
  function DomainEventBus() {
    this._observers = new Map();
  }

  var _proto = DomainEventBus.prototype;

  _proto.register = function register(_ref) {
    var eventName = _ref.eventName,
        observer = _ref.observer;

    if (!eventName) {
      throw new Error('Event Name is required');
    }

    if (typeof observer !== 'function') {
      throw new Error('Observer must be a function');
    }

    if (!this._observers.has(eventName)) {
      this._observers.set(eventName, [observer]);
    } else {
      this._observers.get(eventName).push(observer);
    }
  };

  _proto.raise = function raise(_ref2) {
    var _this = this;

    var domainEvent = _ref2.domainEvent;

    if (this._observers.has(domainEvent.eventName)) {
      this._observers.get(domainEvent.eventName).forEach(function (observer) {
        try {
          observer({
            event: domainEvent.eventName,
            payload: domainEvent.payload,
            dispatcher: function dispatcher(data) {
              return _this.raise({
                domainEvent: data
              });
            }
          });
        } catch (err) {
          _this.raise({
            domainEvent: (0, _observerErrorThrown.observerErrorThrown)({
              message: 'Error processing the observer.',
              error: err
            })
          });
        }
      });
    }
  };

  _proto.getNumberOfRegisteredEvents = function getNumberOfRegisteredEvents() {
    return this._observers.size;
  };

  _proto.getNumberOfObserversRegisteredForAnEvent = function getNumberOfObserversRegisteredForAnEvent(_ref3) {
    var eventName = _ref3.eventName;
    return this._observers.has(eventName) ? this._observers.get(eventName).length : 0;
  };

  _proto.clearAllObservers = function clearAllObservers() {
    this._observers.clear();
  };

  return DomainEventBus;
}();

var domainEventBus = new DomainEventBus();
var _default = domainEventBus;
exports.default = _default;