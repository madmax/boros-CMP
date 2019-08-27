"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @interface
 */
var ConsentRepository =
/*#__PURE__*/
function () {
  function ConsentRepository() {}

  var _proto = ConsentRepository.prototype;

  _proto.getConsent = function getConsent() {
    throw new Error('ConsentRepository#getConsent');
  };

  _proto.saveConsent = function saveConsent(_ref) {
    var consent = _ref.consent;
    throw new Error('ConsentRepository#saveConsent');
  };

  return ConsentRepository;
}();

exports.default = ConsentRepository;