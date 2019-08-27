"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var IframeCommunication =
/*#__PURE__*/
function () {
  function IframeCommunication(_ref) {
    var window = _ref.window;
    this._window = window;
  }

  var _proto = IframeCommunication.prototype;

  _proto.register = function register() {
    var _this = this;

    return Promise.resolve().then(function () {
      _this._window.addEventListener('message', function (event) {
        if (event && event.source && event.data && event.data.__cmpCall) {
          _this._cmpCallConsumer({
            cmpCall: event.data.__cmpCall,
            source: event.source
          });
        }
      });
    });
  };

  _proto._cmpCallConsumer = function _cmpCallConsumer(_ref2) {
    var cmpCall = _ref2.cmpCall,
        source = _ref2.source;

    this._window.__cmp(cmpCall.command, cmpCall.parameter, function (result, success) {
      return source.postMessage({
        __cmpReturn: {
          returnValue: result,
          success: success,
          callId: cmpCall.callId
        }
      });
    });
  };

  return IframeCommunication;
}();

exports.default = IframeCommunication;