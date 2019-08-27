"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OPTION_ALL_ALLOW = exports.OPTION_ALL_DISMISS = exports.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE = exports.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE = exports.NewVendorsStatusService = void 0;

var _consentValidation = require("../consent/consentValidation");

var NewVendorsStatusService =
/*#__PURE__*/
function () {
  function NewVendorsStatusService(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$option = _ref.option,
        option = _ref$option === void 0 ? OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE : _ref$option;

    this._option = option;
  }

  var _proto = NewVendorsStatusService.prototype;

  _proto.getNewVendorsStatus = function getNewVendorsStatus(_ref2) {
    var _this = this;

    var acceptedVendorIds = _ref2.acceptedVendorIds,
        globalVendorIds = _ref2.globalVendorIds,
        allowedVendorIds = _ref2.allowedVendorIds;
    return Promise.resolve().then(function () {
      return (0, _consentValidation.getConsentVendorsContext)({
        acceptedVendorIds: acceptedVendorIds,
        globalVendorIds: globalVendorIds,
        allowedVendorIds: allowedVendorIds
      });
    }).then(function (consentVendorsContext) {
      switch (_this._option) {
        case OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE:
          return optionUseSameThanAll({
            consentVendorsContext: consentVendorsContext,
            customIs: true
          });

        case OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE:
          return optionUseSameThanAll({
            consentVendorsContext: consentVendorsContext,
            customIs: false
          });

        case OPTION_ALL_ALLOW:
          return optionAllAllow({
            consentVendorsContext: consentVendorsContext
          });

        case OPTION_ALL_DISMISS:
          return optionAllDismiss({
            consentVendorsContext: consentVendorsContext
          });

        default:
          return optionUseSameThanAll({
            consentVendorsContext: consentVendorsContext,
            customIs: true
          });
      }
    });
  };

  return NewVendorsStatusService;
}();

exports.NewVendorsStatusService = NewVendorsStatusService;

var optionUseSameThanAll = function optionUseSameThanAll(_ref3) {
  var consentVendorsContext = _ref3.consentVendorsContext,
      customIs = _ref3.customIs;
  return Promise.resolve().then(function () {
    switch (consentVendorsContext) {
      case _consentValidation.ALL_ALLOWED:
        return true;

      case _consentValidation.ALL_DISALLOWED:
        return false;

      case _consentValidation.CUSTOM_ALLOWED:
        return customIs;
    }
  });
};

var optionAllDismiss = function optionAllDismiss(_ref4) {
  var consentVendorsContext = _ref4.consentVendorsContext;
  return Promise.resolve(false);
};

var optionAllAllow = function optionAllAllow(_ref5) {
  var consentVendorsContext = _ref5.consentVendorsContext;
  return Promise.resolve(true);
};

var OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE = 'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE';
exports.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE = OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_TRUE;
var OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE = 'OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE';
exports.OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE = OPTION_USE_SAME_THAN_ALL_CUSTOM_IS_FALSE;
var OPTION_ALL_DISMISS = 'OPTION_ALL_DISMISS';
exports.OPTION_ALL_DISMISS = OPTION_ALL_DISMISS;
var OPTION_ALL_ALLOW = 'OPTION_ALL_ALLOW';
exports.OPTION_ALL_ALLOW = OPTION_ALL_ALLOW;