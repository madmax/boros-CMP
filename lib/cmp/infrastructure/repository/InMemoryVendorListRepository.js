"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * @class
 * @implements VendorListRepository
 */
var InMemoryVendorListRepository =
/*#__PURE__*/
function () {
  function InMemoryVendorListRepository(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        initialVendorList = _ref.initialVendorList;

    this._vendorListMap = new Map();

    if (initialVendorList) {
      this._vendorListMap.set(initialVendorList.vendorListVersion, initialVendorList);
    }

    this._latestVersion = initialVendorList && initialVendorList.vendorListVersion || 0;
  }

  var _proto = InMemoryVendorListRepository.prototype;

  _proto.getGlobalVendorList = function getGlobalVendorList(_temp2) {
    var _this = this;

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$vendorListVersi = _ref2.vendorListVersion,
        vendorListVersion = _ref2$vendorListVersi === void 0 ? this._latestVersion : _ref2$vendorListVersi;

    return Promise.resolve().then(function () {
      return _this._vendorListMap.get(vendorListVersion);
    });
  };

  _proto.setGlobalVendorList = function setGlobalVendorList(_temp3) {
    var _this2 = this;

    var _ref3 = _temp3 === void 0 ? {} : _temp3,
        globalVendorList = _ref3.globalVendorList;

    return Promise.resolve(globalVendorList.vendorListVersion).then(function (version) {
      _this2._vendorListMap.set(version, globalVendorList);

      _this2._latestVersion = Math.max(version, _this2._latestVersion);
    });
  };

  (0, _createClass2.default)(InMemoryVendorListRepository, [{
    key: "latestVersion",
    get: function get() {
      return this._latestVersion;
    }
  }]);
  return InMemoryVendorListRepository;
}();

exports.default = InMemoryVendorListRepository;