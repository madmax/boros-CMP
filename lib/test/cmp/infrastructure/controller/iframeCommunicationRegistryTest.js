"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _jsdom = require("jsdom");

var _IframeCommunication = _interopRequireDefault(require("../../../../cmp/infrastructure/controller/IframeCommunication"));

var _fixJSDOMPostMessage = _interopRequireDefault(require("./fixJSDOMPostMessage"));

describe('registerIframeCommunication', function () {
  describe('Given a cmp instance and a window object', function () {
    it('Should register a window listener to consume post messages from iframe and delegate them to the cmp', function (done) {
      var givenWindow = new _jsdom.JSDOM('<!DOCTYPE html><div>Hello world</div>').window;
      (0, _fixJSDOMPostMessage.default)({
        origin: givenWindow,
        target: givenWindow
      });
      var givenCommand = 'test';
      var givenParameter = {
        what: 'ever'
      };
      var givenCallId = 3;
      var givenCmpResult = {
        a: 'result'
      };
      var givenCmpSuccess = true;
      givenWindow.addEventListener('message', function (event) {
        try {
          if (event && event.data && event.data.__cmpReturn) {
            var cmpReturn = event.data.__cmpReturn;
            (0, _chai.expect)(cmpReturn.returnValue, 'return value should be the returned by the cmp observer callback').to.deep.equal(givenCmpResult);
            (0, _chai.expect)(cmpReturn.success, 'success value should be the returned by the cmp observer callback').to.deep.equal(givenCmpSuccess);
            (0, _chai.expect)(cmpReturn.callId, 'callId value should be the same callId sent from the initial postMessage caller').to.deep.equal(givenCallId);
            done();
          }
        } catch (e) {
          done(e);
        }
      });

      var cmpMock = function cmpMock(command, parameter, observer) {
        try {
          (0, _chai.expect)(command, 'command should be the command received in the __cmpCall').to.equal(givenCommand);
          (0, _chai.expect)(parameter, 'the parameter should be the received in the __cmpCall').to.deep.equal(givenParameter);
          observer(givenCmpResult, givenCmpSuccess);
        } catch (e) {
          done(e);
        }
      };

      givenWindow.__cmp = cmpMock;
      Promise.resolve().then(function () {
        return new _IframeCommunication.default({
          window: givenWindow
        }).register();
      }).then(function () {
        givenWindow.postMessage({
          __cmpCall: {
            command: givenCommand,
            parameter: givenParameter,
            callId: givenCallId
          }
        }, '*');
      });
    });
  });
});