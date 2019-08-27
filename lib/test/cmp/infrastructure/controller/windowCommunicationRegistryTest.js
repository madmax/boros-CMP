"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _windowCommunicationRegistry = _interopRequireDefault(require("../../../../cmp/infrastructure/controller/windowCommunicationRegistry"));

describe('registerWindowCMP', function () {
  describe('Given a cmp instance and a window object', function () {
    it('Should register the cmp instance into window.__cmp property', function (done) {
      var windowMock = {};

      var cmpMock = function cmpMock() {
        return null;
      };

      Promise.resolve().then(function () {
        return (0, _windowCommunicationRegistry.default)({
          window: windowMock,
          cmp: cmpMock
        });
      }).then(function () {
        (0, _chai.expect)(windowMock.__cmp, 'should have registered the cmp function').to.not.undefined;
      }).then(function () {
        return done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});