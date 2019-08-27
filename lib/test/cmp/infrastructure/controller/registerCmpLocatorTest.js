"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _jsdom = require("jsdom");

var _registerCmpLocator = _interopRequireDefault(require("../../../../cmp/infrastructure/controller/registerCmpLocator"));

describe('registerCmpLocator test', function () {
  describe('Given a valid window object', function () {
    it('Should add the iframe inside the window if it does not exist yet', function (done) {
      var givenWindow = new _jsdom.JSDOM('<!DOCTYPE html><div>Hello world</div>').window;
      var expectedIframeName = '__cmpLocator';
      (0, _registerCmpLocator.default)({
        dom: givenWindow.document
      }).then(function (iframe) {
        (0, _chai.expect)(iframe.name, 'The returned iframe should be named as __cmpLocator.').equals(expectedIframeName);
        (0, _chai.expect)(givenWindow.document.getElementsByName(expectedIframeName).length, 'The __cmpLocator iframe should be created as element in the window.').equals(1);
        done();
      }).catch(function (error) {
        return done(error);
      });
    });
    it('Should return the iframe inside the window if it already exists', function (done) {
      var givenWindow = new _jsdom.JSDOM('<!DOCTYPE html><div>Hello world</div>').window;
      var expectedIframeName = '__cmpLocator';
      var giveniFrame = givenWindow.document.createElement('iframe');
      giveniFrame.style.display = 'none';
      giveniFrame.name = expectedIframeName;
      givenWindow.document.body.appendChild(giveniFrame);
      (0, _registerCmpLocator.default)({
        dom: givenWindow.document
      }).then(function (iframe) {
        (0, _chai.expect)(iframe.name, 'The returned iframe should be named as __cmpLocator.').equals(expectedIframeName);
        (0, _chai.expect)(givenWindow.document.getElementsByName(expectedIframeName).length, 'The __cmpLocator iframe should be created as element in the window.').equals(1);
        done();
      }).catch(function (error) {
        return done(error);
      });
    });
  });
});