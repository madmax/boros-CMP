"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _GetVendorListUseCase = _interopRequireDefault(require("../../../cmp/application/services/vendor_list/GetVendorListUseCase"));

describe('Get Vendor List Use Case', function () {
  it('Should return the global vendor list', function (done) {
    var expectedResult = 'whatever result';
    var vendorListRepositoryMock = {
      getGlobalVendorList: function getGlobalVendorList() {
        return Promise.resolve(expectedResult);
      }
    };
    var useCase = new _GetVendorListUseCase.default({
      vendorListRepository: vendorListRepositoryMock
    });

    var getGlobalVendorListSpy = _sinon.default.spy(vendorListRepositoryMock, 'getGlobalVendorList');

    useCase.getVendorList().then(function (result) {
      (0, _chai.expect)(getGlobalVendorListSpy.calledOnce, 'result should be the vendor list returned by the repository').to.be.true;
      (0, _chai.expect)(result, 'result should be the vendor list returned by the repository').to.deep.equal(expectedResult);
    }).then(function () {
      return done();
    }).catch(function (e) {
      return done(e);
    });
  });
});