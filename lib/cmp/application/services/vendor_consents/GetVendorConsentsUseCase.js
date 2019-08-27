"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _filterConsentMustExist = _interopRequireDefault(require("../../../domain/consent/filterConsentMustExist"));

var GetVendorConsentsUseCase =
/*#__PURE__*/
function () {
  function GetVendorConsentsUseCase(_ref) {
    var vendorConsentsRepository = _ref.vendorConsentsRepository;
    this._getStoredVendorConsents = getStoredVendorConsents({
      vendorConsentsRepository: vendorConsentsRepository
    });
  }

  var _proto = GetVendorConsentsUseCase.prototype;

  _proto.getVendorConsents = function getVendorConsents(_temp) {
    var _this = this;

    var _ref2 = _temp === void 0 ? {} : _temp,
        vendorIds = _ref2.vendorIds;

    return Promise.resolve().then(function () {
      return _this._getStoredVendorConsents({
        allowedVendorIds: vendorIds
      });
    }).then(_filterConsentMustExist.default);
  };

  return GetVendorConsentsUseCase;
}();

exports.default = GetVendorConsentsUseCase;

var getStoredVendorConsents = function getStoredVendorConsents(_ref3) {
  var vendorConsentsRepository = _ref3.vendorConsentsRepository;
  return function (_ref4) {
    var allowedVendorIds = _ref4.allowedVendorIds;
    return vendorConsentsRepository.getVendorConsents({
      allowedVendorIds: allowedVendorIds
    });
  };
};