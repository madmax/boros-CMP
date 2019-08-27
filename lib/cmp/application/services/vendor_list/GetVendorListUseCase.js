"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var GetVendorListUseCase =
/*#__PURE__*/
function () {
  function GetVendorListUseCase(_ref) {
    var vendorListRepository = _ref.vendorListRepository;
    this._vendorListRepository = vendorListRepository;
  }
  /**
   * The result will be the GlobalVendorList being the vendor list object of the requested version.
   * If the vendorListVersion is null, the vendor list for the VendorListVersion in the current consent string is returned.
   * If no consent string value is currently set, the latest version of the vendor list is returned.
   * If the vendorListVersion value is ?LATEST?, the latest version available is returned.
   * If the vendorListVersion is invalid, an InvalidVendorListError is thrown.
   * @param vendorListVersion
   */


  var _proto = GetVendorListUseCase.prototype;

  _proto.getVendorList = function getVendorList(_temp) {
    var _this = this;

    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$vendorListVersi = _ref2.vendorListVersion,
        vendorListVersion = _ref2$vendorListVersi === void 0 ? null : _ref2$vendorListVersi;

    return Promise.resolve().then(function () {
      return _this._vendorListRepository.getGlobalVendorList({
        vendorListVersion: vendorListVersion
      });
    });
  };

  return GetVendorListUseCase;
}();

exports.default = GetVendorListUseCase;