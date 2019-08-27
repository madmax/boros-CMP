"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GlobalVendorListAccessError = _interopRequireDefault(require("../../domain/vendor_list/GlobalVendorListAccessError"));

/**
 * @class
 * @implements VendorListRepository
 */
var HttpVendorListRepository =
/*#__PURE__*/
function () {
  function HttpVendorListRepository(_ref) {
    var fetcher = _ref.fetcher,
        vendorListHost = _ref.vendorListHost,
        vendorListFilename = _ref.vendorListFilename;
    this._fetcher = fetcher;
    this._vendorListHost = vendorListHost;
    this._vendorListFilename = vendorListFilename;
  }

  var _proto = HttpVendorListRepository.prototype;

  _proto.getGlobalVendorList = function getGlobalVendorList(_temp) {
    var _this = this;

    var _ref2 = _temp === void 0 ? {} : _temp,
        vendorListVersion = _ref2.vendorListVersion;

    return Promise.resolve(this._vendorListHost + (vendorListVersion ? '/v-' + vendorListVersion : '') + '/' + this._vendorListFilename).then(function (url) {
      return _this._fetcher(url);
    }).then(filterOkFetchResponse).then(function (fetchResponse) {
      return fetchResponse.json();
    });
  };

  return HttpVendorListRepository;
}();

exports.default = HttpVendorListRepository;

var filterOkFetchResponse = function filterOkFetchResponse(fetchResponse) {
  if (!fetchResponse.ok) {
    throw new _GlobalVendorListAccessError.default('Invalid response fetching the global vendor list');
  }

  return fetchResponse;
};