"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commandConsumer2 = _interopRequireDefault(require("./services/commandConsumer"));

var _buildValidVendorConsents = _interopRequireDefault(require("./services/vendor_consents/buildValidVendorConsents"));

var Cmp =
/*#__PURE__*/
function () {
  /**
   *
   * @param container
   */
  function Cmp(_ref) {
    var container = _ref.container;
    this._container = container;
  }

  var _proto = Cmp.prototype;

  _proto.getVendorConsents = function getVendorConsents(vendorIds) {
    return this._container.getInstance({
      key: 'GetVendorConsentsUseCase'
    }).getVendorConsents({
      vendorIds: vendorIds
    });
  };

  _proto.setVendorConsents = function setVendorConsents(vendorConsents) {
    var _this = this;

    return Promise.resolve(vendorConsents).then(_buildValidVendorConsents.default).then(function (validVendorConsents) {
      return _this._container.getInstance({
        key: 'SetVendorConsentsUseCase'
      }).setVendorConsents({
        vendorConsents: validVendorConsents
      });
    });
  };

  _proto.getConsentData = function getConsentData(consentStringVersion) {
    return this._container.getInstance({
      key: 'GetConsentDataUseCase'
    }).getConsentData({
      consentStringVersion: consentStringVersion
    });
  };

  _proto.ping = function ping(_) {
    return this._container.getInstance({
      key: 'PingUseCase'
    }).ping();
  };

  _proto.getVendorList = function getVendorList(vendorListVersion) {
    return this._container.getInstance({
      key: 'GetVendorListUseCase'
    }).getVendorList({
      vendorListVersion: vendorListVersion
    });
  };

  _proto.getConsentStatus = function getConsentStatus(_) {
    return this._container.getInstance({
      key: 'GetConsentStatusUseCase'
    }).getConsentStatus();
  }
  /**
   *
   * @returns {*}
   */
  ;

  _proto.commandConsumer = function commandConsumer() {
    return (0, _commandConsumer2.default)(this._container.getInstance({
      key: 'Log'
    }))(this);
  };

  return Cmp;
}();

exports.default = Cmp;