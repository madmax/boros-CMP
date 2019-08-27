"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @interface
 */
var VendorListRepository =
/*#__PURE__*/
function () {
  function VendorListRepository() {}

  var _proto = VendorListRepository.prototype;

  _proto.getGlobalVendorList = function getGlobalVendorList(_ref) {
    var vendorListVersion = _ref.vendorListVersion;
    throw new Error('VendorListRepository#getGlobalVendorList');
  };

  return VendorListRepository;
}();

exports.default = VendorListRepository;