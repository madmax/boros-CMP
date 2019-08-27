"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugHandler = void 0;

var debugHandler = function debugHandler(logger) {
  return {
    get: function get(target, propKey) {
      var propertyType = typeof target[propKey];

      switch (propertyType) {
        case 'function':
          return function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            logger.debug("Function " + propKey + " called from class " + target.constructor.name + " with arguments:", Object.entries(args));
            return target[propKey].apply(target, args);
          };

        default:
          logger.debug("Reading property \"" + propKey + "\" type of " + typeof target[propKey] + " from class " + target.constructor.name);
      }

      return target[propKey];
    }
  };
};

exports.debugHandler = debugHandler;