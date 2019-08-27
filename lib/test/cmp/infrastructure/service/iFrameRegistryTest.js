"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _jsdom = require("jsdom");

var _IframeRegistry = _interopRequireDefault(require("../../../../cmp/infrastructure/service/IframeRegistry"));

describe('IFrameRegistry', function () {
  describe('Given a window document', function () {
    it('Should create an IFrame and write it on the document', function (done) {
      var givenDOM = new _jsdom.JSDOM('<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>').window.document;
      new _IframeRegistry.default({
        dom: givenDOM
      }).register({
        url: 'whatever.html'
      }).then(function (iFrame) {
        (0, _chai.expect)(iFrame.id).to.equal('cmp-frame');
        (0, _chai.expect)(givenDOM.getElementById('cmp-frame').src).to.equal(iFrame.src);
        done();
      }).catch(function (error) {
        return done(new Error(error));
      });
    });
    it('Should fail registering without a source URL', function (done) {
      var givenDOM = new _jsdom.JSDOM('<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>').window.document;
      new _IframeRegistry.default({
        dom: givenDOM
      }).register({}).then(function () {
        return done(new Error('should fail'));
      }).catch(function (e) {
        (0, _chai.expect)(e.message).to.include('source URL of global storage');
        done();
      }).catch(function (e) {
        return done(e);
      });
    });
  });
});