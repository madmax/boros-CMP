"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _jsdom = require("jsdom");

var _CookieHandler = _interopRequireDefault(require("../../../../cmp/infrastructure/service/CookieHandler"));

describe('CookieHandler', function () {
  describe('Given a cookieName, value and params', function () {
    it('Should be written a cookie in the browser', function (done) {
      var givenCookieName = 'cookieMonster';
      var givenCookieValue = 'nyam_nyam';
      var givenCookieMaxAgeSeconds = 100;
      var givenDOM = new _jsdom.JSDOM('<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>').window.document;
      var cookieHandler = new _CookieHandler.default({
        dom: givenDOM
      });
      var expectedCookieString = givenCookieName + "=" + givenCookieValue + ";path=/;max-age=" + givenCookieMaxAgeSeconds;
      var expectedCookieKeyValue = givenCookieName + "=" + givenCookieValue;
      cookieHandler.write({
        cookieName: givenCookieName,
        value: givenCookieValue,
        maxAgeSeconds: givenCookieMaxAgeSeconds
      }).then(function (cookieString) {
        (0, _chai.expect)(cookieString).to.equal(expectedCookieString);
        (0, _chai.expect)(givenDOM.cookie).to.equal(expectedCookieKeyValue);
        done();
      }).catch(function (error) {
        return done(new Error(error));
      });
    });
  });
  describe('Given a cookieName', function () {
    it('Should return a value associated', function (done) {
      var givenCookieName = 'cookieMonster';
      var givenDOM = new _jsdom.JSDOM('<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>').window.document;
      givenDOM.cookie = 'cookieMonster=nyam_nyam';
      var cookieHandler = new _CookieHandler.default({
        dom: givenDOM
      });
      var expectedCookieValue = 'nyam_nyam';
      cookieHandler.read({
        cookieName: givenCookieName
      }).then(function (cookieValue) {
        (0, _chai.expect)(cookieValue).to.equal(expectedCookieValue);
        done();
      }).catch(function (error) {
        return done(new Error(error));
      });
    });
  });
  describe('Given a non exist cookieName', function () {
    it('Should return undefined', function (done) {
      var givenCookieName = 'batman';
      var givenDOM = new _jsdom.JSDOM('<!DOCTYPE html><div id="fear">I\'m BATMAN!</div>').window.document;
      givenDOM.cookie = 'cookieMonster=nyam_nyam';
      var cookieHandler = new _CookieHandler.default({
        dom: givenDOM
      });
      cookieHandler.read({
        cookieName: givenCookieName
      }).then(function (cookieValue) {
        (0, _chai.expect)(cookieValue).to.be.undefined;
        done();
      }).catch(function (error) {
        return done(new Error(error));
      });
    });
  });
});