"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @class
 * @implements VendorListRepository
 */
var ChainedVendorListRepository =
/*#__PURE__*/
function () {
  function ChainedVendorListRepository(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        inMemoryVendorListRepository = _ref.inMemoryVendorListRepository,
        httpVendorListRepository = _ref.httpVendorListRepository;

    this._getLocalVendorList = getLocalVendorList({
      inMemoryVendorListRepository: inMemoryVendorListRepository
    });
    this._getRemoteVendorList = getRemoteVendorList({
      httpVendorListRepository: httpVendorListRepository
    });
    this._saveRemoteVendorListToLocal = saveRemoteVendorListToLocal({
      inMemoryVendorListRepository: inMemoryVendorListRepository
    });
  }

  var _proto = ChainedVendorListRepository.prototype;

  _proto.getGlobalVendorList = function getGlobalVendorList(_temp2) {
    var _this = this;

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        vendorListVersion = _ref2.vendorListVersion;

    return Promise.resolve().then(function () {
      return _this._getLocalVendorList({
        vendorListVersion: vendorListVersion
      });
    }).then(function (globalVendorList) {
      return globalVendorList || _this._getRemoteVendorList({
        vendorListVersion: vendorListVersion
      }).then(function (globalVendorList) {
        return _this._saveRemoteVendorListToLocal({
          globalVendorList: globalVendorList
        }).then(function () {
          return globalVendorList;
        });
      });
    });
  };

  return ChainedVendorListRepository;
}();

exports.default = ChainedVendorListRepository;

var getLocalVendorList = function getLocalVendorList(_ref3) {
  var inMemoryVendorListRepository = _ref3.inMemoryVendorListRepository;
  return function (_ref4) {
    var vendorListVersion = _ref4.vendorListVersion;
    return inMemoryVendorListRepository.getGlobalVendorList({
      vendorListVersion: vendorListVersion
    });
  };
};

var getRemoteVendorList = function getRemoteVendorList(_ref5) {
  var httpVendorListRepository = _ref5.httpVendorListRepository;
  return function (_ref6) {
    var vendorListVersion = _ref6.vendorListVersion;
    return httpVendorListRepository.getGlobalVendorList({
      vendorListVersion: vendorListVersion
    });
  };
};

var saveRemoteVendorListToLocal = function saveRemoteVendorListToLocal(_ref7) {
  var inMemoryVendorListRepository = _ref7.inMemoryVendorListRepository;
  return function (_ref8) {
    var globalVendorList = _ref8.globalVendorList;
    return inMemoryVendorListRepository.setGlobalVendorList({
      globalVendorList: globalVendorList
    });
  };
};