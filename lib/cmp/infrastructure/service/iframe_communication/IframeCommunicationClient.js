"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _requestBuilder = _interopRequireDefault(require("./requestBuilder"));

var _responseBuilder = _interopRequireDefault(require("./responseBuilder"));

var _RequestTimeoutError = _interopRequireDefault(require("./RequestTimeoutError"));

var _postMessage = require("../../configuration/postMessage");

var IframeCommunicationClient =
/*#__PURE__*/
function () {
  function IframeCommunicationClient(_ref) {
    var origin = _ref.origin,
        target = _ref.target,
        idGenerator = _ref.idGenerator;
    this._origin = origin;
    this._target = target;
    this._idGenerator = idGenerator;
  }

  var _proto = IframeCommunicationClient.prototype;

  _proto.request = function request(_request) {
    var transactionId = this._idGenerator.generate();

    return Promise.race([this._doRequest({
      request: _request,
      transactionId: transactionId
    }), this._timeout({
      transactionId: transactionId
    })]);
  };

  _proto._doRequest = function _doRequest(_ref2) {
    var _this = this;

    var request = _ref2.request,
        transactionId = _ref2.transactionId;
    return new Promise(function (resolve, reject) {
      _this._origin.addEventListener(_postMessage.POST_MESSAGE_ID, function (event) {
        var response = (0, _responseBuilder.default)((0, _objectSpread2.default)({}, event.data.__cmpReturn));

        if (response.__cmpReturn.callId === transactionId) {
          if (response.__cmpReturn.success) {
            resolve(response.__cmpReturn.returnValue);
          } else {
            reject(response.__cmpReturn.returnValue);
          }
        }
      });

      _this._target.postMessage((0, _requestBuilder.default)({
        callId: transactionId,
        command: request.command,
        parameter: (0, _objectSpread2.default)({}, request.params)
      }), _postMessage.POST_MESSAGE_TARGET_ORIGIN);
    });
  };

  _proto._timeout = function _timeout(_ref3) {
    var transactionId = _ref3.transactionId;
    return new Promise(function (resolve, reject) {
      var wait = setTimeout(function () {
        clearTimeout(wait);
        reject(new _RequestTimeoutError.default(transactionId));
      }, _postMessage.POST_MESSAGE_DEFAULT_REQUEST_TIMEOUT);
    });
  };

  return IframeCommunicationClient;
}();

exports.default = IframeCommunicationClient;