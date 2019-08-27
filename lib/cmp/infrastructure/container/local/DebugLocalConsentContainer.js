"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _LocalConsentContainer = _interopRequireDefault(require("./LocalConsentContainer"));

var _loggerDebugHandler = require("../../service/log/loggerDebugHandler");

var _DomainEventBus = _interopRequireDefault(require("../../../domain/event_bus/DomainEventBus"));

var _observerErrorThrown = require("../../../domain/event_bus/observerErrorThrown");

var _vendorConsentsCreated = require("../../../domain/vendor_consents/vendorConsentsCreated");

var _debugObserverFactory = require("../../observer/debugObserverFactory");

var _Log = require("../../service/log/Log");

var DebugLocalConsentContainer =
/*#__PURE__*/
function (_LocalConsentContaine) {
  (0, _inheritsLoose2.default)(DebugLocalConsentContainer, _LocalConsentContaine);

  function DebugLocalConsentContainer(_ref) {
    var config = _ref.config,
        window = _ref.window;
    return _LocalConsentContaine.call(this, {
      config: (0, _objectSpread2.default)({}, config, {
        log: {
          level: _Log.LEVEL.debug
        }
      }),
      window: window
    }) || this;
  }

  var _proto = DebugLocalConsentContainer.prototype;

  _proto.getInstance = function getInstance(_ref2) {
    var key = _ref2.key;

    if (undefined === this._instances.get(key)) {
      try {
        this._instances.set(key, this['_build' + key]());
      } catch (e) {
        throw new Error("Error creating instance: " + key + ", detailed message:" + e.message);
      }
    }

    return key === 'Log' ? this._instances.get(key) : new Proxy(this._instances.get(key), (0, _loggerDebugHandler.debugHandler)(this._instances.get('Log')));
  };

  _proto._buildDebugObserverFactory = function _buildDebugObserverFactory() {
    var logger = this.getInstance({
      key: 'Log'
    });
    return (0, _debugObserverFactory.debugObserverFactory)(logger);
  };

  _proto._buildEagerSingletonInstances = function _buildEagerSingletonInstances() {
    this.getInstance({
      key: 'Log'
    });

    _LocalConsentContaine.prototype._buildEagerSingletonInstances.call(this);

    var errorObserver = this.getInstance({
      key: 'ErrorObserverFactory'
    });
    var debugObserver = this.getInstance({
      key: 'DebugObserverFactory'
    });

    _DomainEventBus.default.register({
      eventName: _observerErrorThrown.OBSERVER_ERROR_THROWN,
      observer: errorObserver
    });

    _DomainEventBus.default.register({
      eventName: _vendorConsentsCreated.VENDOR_CONSENTS_CREATED,
      observer: debugObserver
    });
  };

  return DebugLocalConsentContainer;
}(_LocalConsentContainer.default);

exports.default = DebugLocalConsentContainer;