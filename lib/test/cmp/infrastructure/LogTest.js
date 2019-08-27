"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _Log = require("../../../cmp/infrastructure/service/log/Log");

describe('Log', function () {
  describe('changeLevel', function () {
    it('Should update the log level to the new value', function () {
      var log = new _Log.Log({
        level: _Log.LEVEL.error
      });
      log.changeLevel({
        level: _Log.LEVEL.debug
      });
      (0, _chai.expect)(log.level, 'should set the level to debug').to.equal(_Log.LEVEL.debug);
    });
    it('Should keep the log level if received level is not valid', function () {
      var log = new _Log.Log({
        level: _Log.LEVEL.error
      });
      log.changeLevel({
        level: 2000
      });
      (0, _chai.expect)(log.level, 'should keep the level to error').to.equal(_Log.LEVEL.error);
    });
  });
  describe('debug', function () {
    it('Should call console log with args if level is debug', function () {
      var consoleMock = {
        log: function log() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'log');

      var log = new _Log.Log({
        level: _Log.LEVEL.debug,
        console: consoleMock
      });
      log.debug('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the log method in console').to.be.true;
      (0, _chai.expect)(logSpy.args[0], 'should format the message and set the args to log').to.deep.equal(['[DEBUG] CMP - message', 'some other', 'thing']);
    });
    it('Should not log nothing if level is off', function () {
      var consoleMock = {
        log: function log() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'log');

      var log = new _Log.Log({
        level: _Log.LEVEL.off,
        console: consoleMock
      });
      log.debug('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the log method in console').to.be.false;
    });
    it('Should not log nothing if level is greater than debug', function () {
      var consoleMock = {
        log: function log() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'log');

      var log = new _Log.Log({
        level: _Log.LEVEL.info,
        console: consoleMock
      });
      log.debug('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the log method in console').to.be.false;
    });
  });
  describe('info', function () {
    it('Should call console info with args if level is info', function () {
      var consoleMock = {
        info: function info() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'info');

      var log = new _Log.Log({
        level: _Log.LEVEL.info,
        console: consoleMock
      });
      log.info('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the log method in console').to.be.true;
      (0, _chai.expect)(logSpy.args[0], 'should format the message and set the args to log').to.deep.equal(['[INFO] CMP - message', 'some other', 'thing']);
    });
    it('Should not log nothing if level is off', function () {
      var consoleMock = {
        info: function info() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'info');

      var log = new _Log.Log({
        level: _Log.LEVEL.off,
        console: consoleMock
      });
      log.info('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the info method in console').to.be.false;
    });
    it('Should not log nothing if level is greater than info', function () {
      var consoleMock = {
        info: function info() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'info');

      var log = new _Log.Log({
        level: _Log.LEVEL.warn,
        console: consoleMock
      });
      log.info('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the info method in console').to.be.false;
    });
  });
  describe('warn', function () {
    it('Should call console warn with args if level is warn', function () {
      var consoleMock = {
        warn: function warn() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'warn');

      var log = new _Log.Log({
        level: _Log.LEVEL.warn,
        console: consoleMock
      });
      log.warn('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the warn method in console').to.be.true;
      (0, _chai.expect)(logSpy.args[0], 'should format the message and set the args to log').to.deep.equal(['[WARN] CMP - message', 'some other', 'thing']);
    });
    it('Should not log nothing if level is off', function () {
      var consoleMock = {
        warn: function warn() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'warn');

      var log = new _Log.Log({
        level: _Log.LEVEL.off,
        console: consoleMock
      });
      log.info('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the warn method in console').to.be.false;
    });
    it('Should not log nothing if level is greater than info', function () {
      var consoleMock = {
        warn: function warn() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'warn');

      var log = new _Log.Log({
        level: _Log.LEVEL.ERROR,
        console: consoleMock
      });
      log.warn('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the warn method in console').to.be.false;
    });
  });
  describe('error', function () {
    it('Should call console error with args if level is warn', function () {
      var consoleMock = {
        error: function error() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'error');

      var log = new _Log.Log({
        level: _Log.LEVEL.error,
        console: consoleMock
      });
      log.error('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the error method in console').to.be.true;
      (0, _chai.expect)(logSpy.args[0], 'should format the message and set the args to log').to.deep.equal(['[ERROR] CMP - message', 'some other', 'thing']);
    });
    it('Should not log nothing if level is off', function () {
      var consoleMock = {
        error: function error() {
          return null;
        }
      };

      var logSpy = _sinon.default.spy(consoleMock, 'error');

      var log = new _Log.Log({
        level: _Log.LEVEL.off,
        console: consoleMock
      });
      log.error('message', 'some other', 'thing');
      (0, _chai.expect)(logSpy.calledOnce, 'should call the error method in console').to.be.false;
    });
  });
});