"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var commandConsumer = function commandConsumer(log) {
  return function (cmpFacade) {
    return function (command, parameters, observer) {
      return Promise.resolve().then(function () {
        return log.debug('Received command:', command);
      }).then(function () {
        return filterCommandIsFunction({
          controller: cmpFacade,
          command: command
        });
      }).then(function () {
        return Promise.race([Promise.resolve(true), callCommand({
          log: log,
          cmpFacade: cmpFacade,
          command: command,
          parameters: parameters,
          observer: observer
        })]);
      }).catch(function (e) {
        log.error('Error:', command, '-', e.message);
        return false;
      });
    };
  };
};

var _default = commandConsumer;
exports.default = _default;

var callCommand = function callCommand(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      log = _ref.log,
      cmpFacade = _ref.cmpFacade,
      command = _ref.command,
      parameters = _ref.parameters,
      _ref$observer = _ref.observer,
      observer = _ref$observer === void 0 ? function () {
    return null;
  } : _ref$observer;

  return Promise.resolve().then(function () {
    return cmpFacade[command](parameters);
  }).then(function (result) {
    return observer(result, true);
  }).catch(function (e) {
    log.error('Error calling command:', command, '-', e.message);
    observer(null, false);
  });
};

var filterCommandIsFunction = function filterCommandIsFunction(_ref2) {
  var controller = _ref2.controller,
      command = _ref2.command;

  if (command && typeof controller[command] === 'function') {
    return Promise.resolve(command);
  } else {
    return Promise.reject(new Error('Unexisting command: ' + command));
  }
};