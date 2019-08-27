"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _FileVendorListRepository = _interopRequireDefault(require("../../../integration/repository/FileVendorListRepository"));

var _Log = require("../../../../cmp/infrastructure/service/log/Log");

var _LocalConsentContainer = _interopRequireDefault(require("../../../../cmp/infrastructure/container/local/LocalConsentContainer"));

var TestLocalStoreContainer =
/*#__PURE__*/
function (_LocalConsentContaine) {
  (0, _inheritsLoose2.default)(TestLocalStoreContainer, _LocalConsentContaine);

  function TestLocalStoreContainer(_ref) {
    var config = _ref.config,
        window = _ref.window;
    return _LocalConsentContaine.call(this, {
      config: config,
      window: window,
      cmpVersion: 42,
      eager: false
    }) || this;
  }

  var _proto = TestLocalStoreContainer.prototype;

  _proto._buildVendorListRepository = function _buildVendorListRepository() {
    return new _FileVendorListRepository.default();
  };

  _proto._buildLog = function _buildLog() {
    return new _Log.Log({
      level: _Log.LEVEL.error,
      console: this._window.console
    });
  };

  return TestLocalStoreContainer;
}(_LocalConsentContainer.default);

exports.default = TestLocalStoreContainer;