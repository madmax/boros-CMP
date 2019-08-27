"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _PingUseCase = _interopRequireDefault(require("../../../cmp/application/services/ping/PingUseCase"));

describe('Ping Use Case', function () {
  it('Should return directly with the IAB PingReturn specification', function (done) {
    var useCase = new _PingUseCase.default();
    var expectedPingReturn = {
      gdprAppliesGlobally: false,
      cmpLoaded: true
    };
    useCase.ping().then(function (pingReturn) {
      (0, _chai.expect)(pingReturn, 'invalid PingReturn response').to.deep.equal(expectedPingReturn);
    }).then(function () {
      return done();
    }).catch(function (e) {
      return done(e);
    });
  });
});