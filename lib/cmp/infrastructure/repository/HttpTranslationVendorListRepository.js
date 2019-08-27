"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var HttpTranslationVendorListRepository =
/*#__PURE__*/
function () {
  function HttpTranslationVendorListRepository(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        fetcher = _ref.fetcher,
        vendorListRepository = _ref.vendorListRepository,
        consentLanguage = _ref.consentLanguage;

    this._fetcher = fetcher;
    this._vendorListRepository = vendorListRepository;
    this._consentLanguage = consentLanguage;
    this._acceptedLanguage = ACCEPTED_LANGUAGES.has(this._consentLanguage);
  }

  var _proto = HttpTranslationVendorListRepository.prototype;

  _proto.getGlobalVendorList = function getGlobalVendorList(_temp2) {
    var _this = this;

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        vendorListVersion = _ref2.vendorListVersion;

    return Promise.all([this._vendorListRepository.getGlobalVendorList({
      vendorListVersion: vendorListVersion
    }), this._acceptedLanguage ? this._getTranslation({
      vendorListVersion: vendorListVersion
    }) : null]).then(function (_ref3) {
      var vendorList = _ref3[0],
          translation = _ref3[1];
      return translation ? _this._mergeTranslation({
        vendorList: vendorList,
        translation: translation
      }) : vendorList;
    });
  };

  _proto._getTranslation = function _getTranslation(_ref4) {
    var _this2 = this;

    var vendorListVersion = _ref4.vendorListVersion;
    return Promise.resolve().then(function () {
      return PURPOSES_HOST + "/" + (vendorListVersion ? 'v-' + vendorListVersion + '/' : '') + PURPOSES_FILENAME + "-" + _this2._consentLanguage + PURPOSES_EXTENSION;
    }).then(function (url) {
      return _this2._fetcher(url);
    }).then(function (fetchResponse) {
      return fetchResponse.ok ? fetchResponse.json() : null;
    });
  };

  _proto._mergeTranslation = function _mergeTranslation(_ref5) {
    var vendorList = _ref5.vendorList,
        translation = _ref5.translation;
    return Promise.resolve().then(function () {
      vendorList.purposes = translation.purposes;
      vendorList.features = translation.features;
      return vendorList;
    });
  };

  return HttpTranslationVendorListRepository;
}();

exports.default = HttpTranslationVendorListRepository;
var ACCEPTED_LANGUAGES = new Set(['bg', 'cs', 'da', 'de', 'el', 'es', 'et', 'fi', 'fr', 'ga', 'hr', 'hu', 'it', 'lt', 'lv', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'sl', 'sv']);
var PURPOSES_HOST = 'https://vendorlist.consensu.org';
var PURPOSES_FILENAME = 'purposes';
var PURPOSES_EXTENSION = '.json';