"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _commandConsumer = _interopRequireDefault(require("../../../../cmp/application/services/commandConsumer"));

describe('commandConsumer', function () {
  var createLogMock = function createLogMock() {
    return {
      debug: function debug() {
        return null;
      },
      error: function error() {
        return null;
      }
    };
  };

  describe('Given an executable command', function () {
    it('Should call the valid CMP controller command without errors and call the observer with success value and result value', function (done) {
      var logMock = createLogMock();
      var expectedResultValue = 'result value';
      var controllerMock = {
        anyIABmethod: function anyIABmethod() {
          return Promise.resolve(expectedResultValue);
        }
      };

      var methodSpy = _sinon.default.spy(controllerMock, 'anyIABmethod');

      var parameters = {
        key: 'value'
      };

      var __cmp = (0, _commandConsumer.default)(logMock)(controllerMock);

      var observer = function observer(result, success) {
        Promise.resolve().then(function () {
          (0, _chai.expect)(result, 'received result should be the expected result').to.equal(result);
          (0, _chai.expect)(success, 'success value should be true').to.be.true;
          (0, _chai.expect)(methodSpy.calledOnce, 'CMP method shoud be called').to.be.true;
          (0, _chai.expect)(methodSpy.args[0][0], 'CMP call should recieve the parameters').to.deep.equals(parameters);
          done();
        }).catch(function (e) {
          return done(e);
        });
      };

      __cmp('anyIABmethod', parameters, observer).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('Given an inexisting command', function () {
    it('Should log an error', function (done) {
      var logMock = createLogMock();
      var controllerMock = {};
      var parameters = 'whatever';

      var observer = function observer() {
        return 'whatever';
      };

      var logErrorSpy = _sinon.default.spy(logMock, 'error');

      (0, _commandConsumer.default)(logMock)(controllerMock)('whatever', parameters, observer).then(function (result) {
        (0, _chai.expect)(result, 'output value should be false when an error occurs').to.be.false;
        (0, _chai.expect)(logErrorSpy.calledOnce, 'Should have logged the error').to.be.true;
        (0, _chai.expect)(logErrorSpy.args[0].join(), 'The error should indicate that the command does not exist').to.include('Unexisting command');
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
  describe('Given a valid command without an observer', function () {
    it('Should send a default observer to the controller to be used as command callback', function (done) {
      var logMock = createLogMock();
      var controllerMock = {
        test: function test(parameters, observer) {
          return Promise.resolve().then(function () {
            (0, _chai.expect)(typeof observer, 'the received observer should be a default function').to.equal('function');
          });
        }
      };
      (0, _commandConsumer.default)(logMock)(controllerMock)('test').then(function (result) {
        (0, _chai.expect)(result, 'should end with a true value').to.be.true;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});