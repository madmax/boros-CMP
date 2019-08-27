"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _DomainEventBus = _interopRequireDefault(require("../event_bus/DomainEventBus"));

var _vendorConsentsCreated = require("./vendorConsentsCreated");

/**
 * This object contains the global purposes, and vendors, consented to by the user:
{
  metadata: [base64url-encoded](https://tools.ietf.org/html/rfc4648#section-5) string (header data from the vendor consent format, as described below),
  gdprApplies: *Boolean*,
  hasGlobalScope: *Boolean,  // true if the vendor consent data is retrieved from the global cookie, false if a publisher-specific (or publisher-group-specific) cookie*
  purposeConsents: {
    *purposeId*: *consentBoolean*,
    ?
  },
  vendorConsents: {
    *vendorId* : *consentBoolean*,
    ?
  },
}

 Where vendorId and purposeId are the keys and *consentBoolean *are the values for the consent (false="No Consent?, true=?Consent?). The *gdprApplies *field will be true if the user is determined (by geo-IP lookup) to be in the EU, or the publisher has configured the CMP (via a CMP-specific method not specified by this spec) that they are a EU publisher and thus the CMP UI should be shown for everyone. The metadata will be the base64url-encoded value of the following "header" information described in the cookie format:
 -Cookie Version
 -Created Timestamp
 -Last Updated Timestamp
 -Cmp Id
 -Cmp Version
 -Consent Screen
 -Vendor List Version
 -Publisher Purposes Version (for the PublisherConsent metadata only)
 */
var VendorConsents =
/*#__PURE__*/
function () {
  function VendorConsents(_ref) {
    var metadata = _ref.metadata,
        gdprApplies = _ref.gdprApplies,
        hasGlobalScope = _ref.hasGlobalScope,
        purposeConsents = _ref.purposeConsents,
        vendorConsents = _ref.vendorConsents;
    this._metadata = metadata;
    this._gdprApplies = gdprApplies;
    this._hasGlobalScope = hasGlobalScope;
    this._purposeConsents = purposeConsents;
    this._vendorConsents = vendorConsents;

    _DomainEventBus.default.raise({
      domainEvent: (0, _vendorConsentsCreated.vendorConsentsCreated)({
        metadata: this._metadata,
        gdprApplies: this._gdprApplies,
        hasGlobalScope: this._hasGlobalScope,
        purposeConsents: [].concat(this._purposeConsents),
        vendorConsents: [].concat(this._vendorConsents)
      })
    });
  }

  (0, _createClass2.default)(VendorConsents, [{
    key: "metadata",
    get: function get() {
      return this._metadata;
    }
  }, {
    key: "gdprApplies",
    get: function get() {
      return this._gdprApplies;
    }
  }, {
    key: "hasGlobalScope",
    get: function get() {
      return this._hasGlobalScope;
    }
  }, {
    key: "purposeConsents",
    get: function get() {
      return this._purposeConsents;
    }
  }, {
    key: "vendorConsents",
    get: function get() {
      return this._vendorConsents;
    }
  }]);
  return VendorConsents;
}();

exports.default = VendorConsents;