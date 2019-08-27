"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _FileVendorListRepository = _interopRequireDefault(require("../../../integration/repository/FileVendorListRepository"));

var _Log = require("../../../../cmp/infrastructure/service/log/Log");

var _GlobalConsentContainer = _interopRequireDefault(require("../../../../cmp/infrastructure/container/global/GlobalConsentContainer"));

var TestGlobalStoreContainer =
/*#__PURE__*/
function (_GlobalConsentContain) {
  (0, _inheritsLoose2.default)(TestGlobalStoreContainer, _GlobalConsentContain);

  function TestGlobalStoreContainer(_ref) {
    var config = _ref.config,
        window = _ref.window,
        iframe = _ref.iframe;
    return _GlobalConsentContain.call(this, {
      config: config,
      window: window,
      iframe: iframe,
      cmpVersion: 42,
      eager: false
    }) || this;
  }

  var _proto = TestGlobalStoreContainer.prototype;

  _proto._buildVendorListRepository = function _buildVendorListRepository() {
    return new _FileVendorListRepository.default();
  };

  _proto._buildLog = function _buildLog() {
    return new _Log.Log({
      level: _Log.LEVEL.error,
      console: this._window.console
    });
  };

  return TestGlobalStoreContainer;
}(_GlobalConsentContainer.default);

exports.default = TestGlobalStoreContainer;