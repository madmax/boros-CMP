"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsdom = require("jsdom");

var _fixJSDOMPostMessage = _interopRequireDefault(require("../../cmp/infrastructure/controller/fixJSDOMPostMessage"));

var _chai = require("chai");

var _globalStorage = _interopRequireDefault(require("../../../globalstorage/application/globalStorage"));

var _ReadCookieUseCase = _interopRequireDefault(require("../../../globalstorage/application/service/ReadCookieUseCase"));

var _CookieHandler = _interopRequireDefault(require("../../../cmp/infrastructure/service/CookieHandler"));

var _WriteCookieUseCase = _interopRequireDefault(require("../../../globalstorage/application/service/WriteCookieUseCase"));

var _iframeConsentCommands = require("../../../cmp/infrastructure/configuration/iframeConsentCommands");

var _cookie = require("../../../cmp/infrastructure/configuration/cookie");

describe('globalStorage', function () {
  var givenWindowHost;
  var givenWindowIframe;
  beforeEach(function () {
    givenWindowHost = new _jsdom.JSDOM('<!DOCTYPE html><div>Hello world</div>').window;
    givenWindowIframe = new _jsdom.JSDOM('<!DOCTYPE html><div>Hello world</div>').window;
    (0, _fixJSDOMPostMessage.default)({
      origin: givenWindowHost,
      target: givenWindowIframe
    });
  });
  describe('Given a readCookie command with invalid use case', function () {
    it('Should dispatch an error event with the same callId', function (done) {
      var givenCommand = 'readCookie';
      var givenParameter = {
        what: 'ever'
      };
      var givenCallId = 3;
      var expectedCmpSuccess = false;
      (0, _globalStorage.default)({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: {}
      }).then(function () {
        givenWindowHost.addEventListener('message', function (event) {
          try {
            if (event && event.data && event.data.__cmpReturn) {
              var cmpReturn = event.data.__cmpReturn;
              (0, _chai.expect)(cmpReturn.success, 'success value should be the returned by the cmp observer callback').to.deep.equal(expectedCmpSuccess);
              (0, _chai.expect)(cmpReturn.callId, 'callId value should be the same callId sent from the initial postMessage caller').to.deep.equal(givenCallId);
              done();
            }
          } catch (e) {
            done(e);
          }
        });
      }).then(function () {
        return givenWindowIframe.postMessage({
          __cmpCall: {
            command: givenCommand,
            parameter: givenParameter,
            callId: givenCallId
          }
        }, '*');
      }).catch(function (error) {
        return done(error);
      });
    });
  });
  describe('Given a readCookie command', function () {
    it('Should dispatch a success response', function (done) {
      givenWindowIframe.document.cookie = 'euconsent=red';
      var givenCommand = _iframeConsentCommands.READ_CONSENT_COMMAND;
      var givenParameter = {
        name: 'euconsent'
      };
      var givenCallId = 3;
      var expectedCmpSuccess = true;
      var expectedCookieValue = 'red';
      var readCookieUseCaseMock = new _ReadCookieUseCase.default({
        cookieHandler: new _CookieHandler.default({
          dom: givenWindowIframe.document
        })
      });
      (0, _globalStorage.default)({
        window: givenWindowIframe,
        readCookieUseCase: readCookieUseCaseMock,
        writeCookieUseCase: {}
      }).then(function () {
        givenWindowHost.addEventListener('message', function (event) {
          try {
            if (event && event.data && event.data.__cmpReturn) {
              var cmpReturn = event.data.__cmpReturn;
              (0, _chai.expect)(cmpReturn.success, 'success value should be the returned by the cmp observer callback').to.deep.equal(expectedCmpSuccess);
              (0, _chai.expect)(cmpReturn.returnValue, 'return value should be the returned by the cmp observer callback').to.deep.equal(expectedCookieValue);
              (0, _chai.expect)(cmpReturn.callId, 'callId value should be the same callId sent from the initial postMessage caller').to.deep.equal(givenCallId);
              done();
            }
          } catch (e) {
            done(e);
          }
        });
      }).then(function () {
        return givenWindowIframe.postMessage({
          __cmpCall: {
            command: givenCommand,
            parameter: givenParameter,
            callId: givenCallId
          }
        }, '*');
      }).catch(function (error) {
        return done(error);
      });
    });
  });
  describe('Given a writeCookie command with invalid use case', function () {
    it('Should dispatch an error event with the same callId', function (done) {
      var givenCommand = _iframeConsentCommands.WRITE_CONSENT_COMMAND;
      var givenParameter = {
        name: '',
        value: '',
        path: '',
        maxAgeSeconds: 3600
      };
      var givenCallId = 3;
      var expectedCmpSuccess = false;
      (0, _globalStorage.default)({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: {}
      }).then(function () {
        givenWindowHost.addEventListener('message', function (event) {
          try {
            if (event && event.data && event.data.__cmpReturn) {
              var cmpReturn = event.data.__cmpReturn;
              (0, _chai.expect)(cmpReturn.success, 'success value should be the returned by the cmp observer callback').to.deep.equal(expectedCmpSuccess);
              (0, _chai.expect)(cmpReturn.callId, 'callId value should be the same callId sent from the initial postMessage caller').to.deep.equal(givenCallId);
              done();
            }
          } catch (e) {
            done(e);
          }
        });
      }).then(function () {
        return givenWindowIframe.postMessage({
          __cmpCall: {
            command: givenCommand,
            parameter: givenParameter,
            callId: givenCallId
          }
        }, '*');
      }).catch(function (error) {
        return done(error);
      });
    });
  });
  describe('Given a valid writeCookie command', function () {
    it('Should dispatch a success event with the same callId', function (done) {
      var givenCommand = _iframeConsentCommands.WRITE_CONSENT_COMMAND;
      var givenParameter = {
        value: 'Kill!'
      };
      var givenCallId = 3;
      var expectedCmpSuccess = true;
      var expectedCmpReturnValue = "euconsent=Kill!;path=" + _cookie.VENDOR_CONSENT_COOKIE_DEFAULT_PATH + ";max-age=" + _cookie.VENDOR_CONSENT_COOKIE_MAX_AGE;
      var expectedCookieStored = 'euconsent=Kill!';
      var writeCookieUseCaseMock = new _WriteCookieUseCase.default({
        cookieHandler: new _CookieHandler.default({
          dom: givenWindowIframe.document
        })
      });
      (0, _globalStorage.default)({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: writeCookieUseCaseMock
      }).then(function () {
        givenWindowHost.addEventListener('message', function (event) {
          try {
            if (event && event.data && event.data.__cmpReturn) {
              var cmpReturn = event.data.__cmpReturn;
              (0, _chai.expect)(cmpReturn.success, 'success value should be the returned by the cmp observer callback').to.deep.equal(expectedCmpSuccess);
              (0, _chai.expect)(cmpReturn.returnValue, 'return value should be the returned by the cmp observer callback').to.deep.equal(expectedCmpReturnValue);
              (0, _chai.expect)(cmpReturn.callId, 'callId value should be the same callId sent from the initial postMessage caller').to.deep.equal(givenCallId);
              (0, _chai.expect)(givenWindowIframe.document.cookie, 'written cookie is not the same').to.be.equal(expectedCookieStored);
              done();
            }
          } catch (e) {
            done(e);
          }
        });
      }).then(function () {
        return givenWindowIframe.postMessage({
          __cmpCall: {
            command: givenCommand,
            parameter: givenParameter,
            callId: givenCallId
          }
        }, '*');
      }).catch(function (error) {
        return done(error);
      });
    });
  });
  describe('Given a invalid command', function () {
    it('Should dispatch an error event with the same callId', function (done) {
      var givenCommand = "I'm Batman";
      var givenParameter = {};
      var givenCallId = 3;
      var expectedCmpSuccess = false;
      var expectedCmpReturnValue = 'CommandNotFoundError';
      (0, _globalStorage.default)({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: {}
      }).then(function () {
        givenWindowHost.addEventListener('message', function (event) {
          try {
            if (event && event.data && event.data.__cmpReturn) {
              var cmpReturn = event.data.__cmpReturn;
              (0, _chai.expect)(cmpReturn.success, 'success value should be the returned by the cmp observer callback').to.deep.equal(expectedCmpSuccess);
              (0, _chai.expect)(cmpReturn.returnValue.name, 'return value should be the returned by the cmp observer callback').to.deep.equal(expectedCmpReturnValue);
              (0, _chai.expect)(cmpReturn.callId, 'callId value should be the same callId sent from the initial postMessage caller').to.deep.equal(givenCallId);
              done();
            }
          } catch (e) {
            done(e);
          }
        });
      }).then(function () {
        return givenWindowIframe.postMessage({
          __cmpCall: {
            command: givenCommand,
            parameter: givenParameter,
            callId: givenCallId
          }
        }, '*');
      }).catch(function (error) {
        return done(error);
      });
    });
  });
  describe('Given a invalid event format', function () {
    it('Should dispatch an error event with the same callId', function (done) {
      var givenEvent = {
        wrongFormat: {
          wrongField: 'nothing!'
        }
      };
      var expectedCallId = undefined;
      var expectedCmpSuccess = false;
      var expectedCmpReturnValue = 'EventFormatError';
      (0, _globalStorage.default)({
        window: givenWindowIframe,
        readCookieUseCase: {},
        writeCookieUseCase: {}
      }).then(function () {
        givenWindowHost.addEventListener('message', function (event) {
          try {
            if (event && event.data && event.data.__cmpReturn) {
              var cmpReturn = event.data.__cmpReturn;
              (0, _chai.expect)(cmpReturn.success, 'success value should be the returned by the cmp observer callback').to.deep.equal(expectedCmpSuccess);
              (0, _chai.expect)(cmpReturn.returnValue.name, 'return value should be the returned by the cmp observer callback').to.deep.equal(expectedCmpReturnValue);
              (0, _chai.expect)(cmpReturn.callId, 'callId value should be the same callId sent from the initial postMessage caller').to.deep.equal(expectedCallId);
              done();
            }
          } catch (e) {
            done(e);
          }
        });
      }).then(function () {
        return givenWindowIframe.postMessage({
          givenEvent: givenEvent
        }, '*');
      }).catch(function (error) {
        return done(error);
      });
    });
  });
});