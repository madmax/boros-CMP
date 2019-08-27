"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var CMPFacade =
/*#__PURE__*/
function () {
  function CMPFacade(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        cmp = _ref.cmp,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? 1000 : _ref$timeout;

    this._cmp = cmp;
    this._timeout = timeout;
  }

  var _proto = CMPFacade.prototype;

  _proto.getVendorConsents = function getVendorConsents(vendorIds) {
    return Promise.resolve(this._command('getVendorConsents', vendorIds));
  };

  _proto.setVendorConsents = function setVendorConsents(vendorConsents) {
    return Promise.resolve(this._command('setVendorConsents', vendorConsents));
  };

  _proto.getConsentData = function getConsentData(consentStringVersion) {
    return Promise.resolve(this._command('getConsentData', consentStringVersion));
  };

  _proto.ping = function ping() {
    return Promise.resolve(this._command('ping'));
  };

  _proto.getVendorList = function getVendorList(vendorListVersion) {
    return Promise.resolve(this._command('getVendorList', vendorListVersion));
  };

  _proto.getConsentStatus = function getConsentStatus() {
    return Promise.resolve(this._command('getConsentStatus'));
  };

  _proto._command = function _command(command, parameters) {
    var _this = this;

    return Promise.resolve().then(function () {
      return Promise.race([new Promise(function (resolve, reject) {
        return _this._cmp(command, parameters, function (result, status) {
          return resolve({
            result: result,
            status: status
          });
        });
      }), new Promise(function (resolve, reject) {
        var timeoutId = setTimeout(function () {
          clearTimeout(timeoutId);
          reject(new Error('Timeout on: ' + command));
        }, _this._timeout);
      })]);
    });
  };

  return CMPFacade;
}();

exports.default = CMPFacade;