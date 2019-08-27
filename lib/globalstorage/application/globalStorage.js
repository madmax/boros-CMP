"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _EventFormatError = _interopRequireDefault(require("../infrastructure/event/EventFormatError"));

var _CommandNotFoundError = _interopRequireDefault(require("../infrastructure/event/CommandNotFoundError"));

var _writeCookieCommandFactory = _interopRequireDefault(require("../infrastructure/command/writeCookieCommandFactory"));

var _readCookieCommandFactory = _interopRequireDefault(require("../infrastructure/command/readCookieCommandFactory"));

var _postMessage = require("../../cmp/infrastructure/configuration/postMessage");

var globalStorage = function globalStorage(_ref) {
  var window = _ref.window,
      readCookieUseCase = _ref.readCookieUseCase,
      writeCookieUseCase = _ref.writeCookieUseCase;
  return Promise.all([Promise.resolve((0, _readCookieCommandFactory.default)({
    readCookieUseCase: readCookieUseCase
  })), Promise.resolve((0, _writeCookieCommandFactory.default)({
    writeCookieUseCase: writeCookieUseCase
  }))]).then(function (_ref2) {
    var readCookieCommand = _ref2[0],
        writeCookieCommand = _ref2[1];
    return {
      READ_CONSENT_COMMAND: readCookieCommand,
      WRITE_CONSENT_COMMAND: writeCookieCommand
    };
  }).then(function (commands) {
    window.addEventListener('message', function (event) {
      Promise.resolve(event).then(filterEventFormatIsValid).then(function (filteredEvent) {
        return filterCommandIsValid(filteredEvent)(commands);
      }).then(function (validCommand) {
        return commands[validCommand]({
          input: (0, _objectSpread2.default)({}, event.data.__cmpCall.parameter, {
            callId: event.data.__cmpCall.callId
          })
        });
      }).then(function (response) {
        return event.source.postMessage(response, _postMessage.POST_MESSAGE_TARGET_ORIGIN);
      }).catch(function (error) {
        return sendError({
          error: error,
          event: event
        });
      });
    });
  });
};

var filterEventFormatIsValid = function filterEventFormatIsValid(event) {
  return Promise.resolve(event).then(function (event) {
    if (event && event.data && event.data.__cmpCall && event.data.__cmpCall.callId && event.data.__cmpCall.command && event.data.__cmpCall.parameter) {
      return event;
    }

    return Promise.reject(new _EventFormatError.default(event.data && event.data.__cmpCall && event.data.__cmpCall.callId));
  });
};

var filterCommandIsValid = function filterCommandIsValid(event) {
  return function (commands) {
    return Promise.resolve(event).then(function (event) {
      return event.data.__cmpCall.command;
    }).then(function (command) {
      return typeof commands[command] === 'function' ? command : Promise.reject(new _CommandNotFoundError.default(event.data.__cmpCall.callId));
    });
  };
};

var sendError = function sendError(_ref3) {
  var error = _ref3.error,
      event = _ref3.event;
  return Promise.resolve(error).then(function (error) {
    return {
      __cmpReturn: {
        success: false,
        returnValue: error,
        callId: error.callId
      }
    };
  }).then(function (response) {
    return event.source.postMessage(response, _postMessage.POST_MESSAGE_TARGET_ORIGIN);
  });
};

var _default = globalStorage;
exports.default = _default;