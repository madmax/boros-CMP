"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @class
 * @implements VendorListRepository
 */
var FileVendorListRepository =
/*#__PURE__*/
function () {
  function FileVendorListRepository(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$globalVendorList = _ref.globalVendorListLocation,
        globalVendorListLocation = _ref$globalVendorList === void 0 ? '../../resources/globalvendorlist.json' : _ref$globalVendorList;

    this._globalVendorListLocation = globalVendorListLocation;
  }

  var _proto = FileVendorListRepository.prototype;

  _proto.getGlobalVendorList = function getGlobalVendorList() {
    var _this = this;

    return Promise.resolve().then(function () {
      return require(_this._globalVendorListLocation);
    });
  };

  return FileVendorListRepository;
}();

exports.default = FileVendorListRepository;