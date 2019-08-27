"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _iframeConsentCommands = require("../../../../../cmp/infrastructure/configuration/iframeConsentCommands");

var _IframeCommunicationClient = _interopRequireDefault(require("../../../../../cmp/infrastructure/service/iframe_communication/IframeCommunicationClient"));

var _jsdom = require("jsdom");

var _fixJSDOMPostMessage = _interopRequireDefault(require("../../controller/fixJSDOMPostMessage"));

var _responseBuilder = _interopRequireDefault(require("../../../../../cmp/infrastructure/service/iframe_communication/responseBuilder"));

describe('IframeCommunicationClient', function () {
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
  describe('Given a request', function () {
    it('Should resolve with the expected response', function (done) {
      var givenTransactionId = 3;
      var givenRequest = {
        command: _iframeConsentCommands.READ_CONSENT_COMMAND,
        params: {}
      };
      var iframeCommunicationClient = new _IframeCommunicationClient.default({
        origin: givenWindowHost,
        target: givenWindowIframe,
        idGenerator: {
          generate: function generate() {
            return givenTransactionId;
          }
        }
      });
      var expectedConsentValue = 'Viaje a bali!!';
      givenWindowIframe.addEventListener('message', function (event) {
        event.source.postMessage((0, _responseBuilder.default)({
          callId: event.data.__cmpCall.callId,
          success: true,
          returnValue: expectedConsentValue
        }), '*');
      });
      iframeCommunicationClient.request(givenRequest).then(function (response) {
        (0, _chai.expect)(response).to.equal(expectedConsentValue);
        done();
      }).catch(function (error) {
        return done(new Error(error));
      });
    });
  });
});