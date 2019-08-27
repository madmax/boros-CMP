"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVEL = exports.Log = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Log =
/*#__PURE__*/
function () {
  function Log(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$level = _ref.level,
        level = _ref$level === void 0 ? LEVEL.off : _ref$level,
        console = _ref.console;

    this._level = this._isValidLevel({
      level: level
    }) && level || LEVEL.off;
    this._console = console || NO_CONSOLE;
  }

  var _proto = Log.prototype;

  _proto.changeLevel = function changeLevel(_ref2) {
    var level = _ref2.level;
    this._level = this._isValidLevel({
      level: level
    }) && level || this._level;
  };

  _proto.debug = function debug() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._level <= LEVEL.debug && this._print({
      logMethod: this._console.log,
      level: 'DEBUG',
      args: args
    });
  };

  _proto.info = function info() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    this._level <= LEVEL.info && this._print({
      logMethod: this._console.info,
      level: 'INFO',
      args: args
    });
  };

  _proto.warn = function warn() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    this._level <= LEVEL.warn && this._print({
      logMethod: this._console.warn,
      level: 'WARN',
      args: args
    });
  };

  _proto.error = function error() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    this._level <= LEVEL.error && this._print({
      logMethod: this._console.error,
      level: 'ERROR',
      args: args
    });
  };

  _proto._print = function _print(_ref3) {
    var logMethod = _ref3.logMethod,
        level = _ref3.level,
        args = _ref3.args;

    var _ref4 = [].concat(args),
        message = _ref4[0],
        rest = _ref4.slice(1);

    logMethod.apply(void 0, ["[" + level + "] CMP - " + message].concat(rest));
  };

  _proto._isValidLevel = function _isValidLevel(_ref5) {
    var level = _ref5.level;
    return level >= LEVEL.debug && level <= LEVEL.off;
  };

  (0, _createClass2.default)(Log, [{
    key: "level",
    get: function get() {
      return this._level;
    }
  }]);
  return Log;
}();

exports.Log = Log;
var LEVEL = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  off: 5
};
exports.LEVEL = LEVEL;
var NO_CONSOLE = {
  log: function log() {
    return null;
  },
  info: function info() {
    return null;
  },
  warn: function warn() {
    return null;
  },
  error: function error() {
    return null;
  }
};