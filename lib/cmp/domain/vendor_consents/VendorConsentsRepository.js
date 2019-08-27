"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @interface
 */
var VendorConsentsRepository =
/*#__PURE__*/
function () {
  function VendorConsentsRepository() {}

  var _proto = VendorConsentsRepository.prototype;

  _proto.getVendorConsents = function getVendorConsents(_ref) {
    var allowedVendorIds = _ref.allowedVendorIds;
    throw new Error('VendorConsentsRepository#getVendorConsents');
  };

  _proto.saveVendorConsents = function saveVendorConsents(_ref2) {
    var vendorConsents = _ref2.vendorConsents,
        purposeConsents = _ref2.purposeConsents;
    throw new Error('VendorConsentsRepository#saveVendorConsents');
  };

  return VendorConsentsRepository;
}();

exports.default = VendorConsentsRepository;