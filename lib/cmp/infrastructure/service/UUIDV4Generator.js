"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @implements IdGenerator
 */
var UUIDV4Generator =
/*#__PURE__*/
function () {
  function UUIDV4Generator(_ref) {
    var uuidv4 = _ref.uuidv4;
    this._uuidv4 = uuidv4;
  }

  var _proto = UUIDV4Generator.prototype;

  _proto.generate = function generate() {
    return this._uuidv4();
  };

  return UUIDV4Generator;
}();

exports.default = UUIDV4Generator;