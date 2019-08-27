"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var SetVendorConsentsUseCase =
/*#__PURE__*/
function () {
  function SetVendorConsentsUseCase(_ref) {
    var vendorConsentsRepository = _ref.vendorConsentsRepository;
    this._vendorConsentsRepository = vendorConsentsRepository;
  }

  var _proto = SetVendorConsentsUseCase.prototype;

  _proto.setVendorConsents = function setVendorConsents(_temp) {
    var _ref2 = _temp === void 0 ? {} : _temp,
        vendorConsents = _ref2.vendorConsents;

    return this._vendorConsentsRepository.saveVendorConsents({
      vendorConsents: vendorConsents.vendorConsents,
      purposeConsents: vendorConsents.purposeConsents
    });
  };

  return SetVendorConsentsUseCase;
}();

exports.default = SetVendorConsentsUseCase;