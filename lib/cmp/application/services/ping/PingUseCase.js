"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var PingUseCase =
/*#__PURE__*/
function () {
  function PingUseCase() {}

  var _proto = PingUseCase.prototype;

  /**
   * The "ping" command invokes the callback immediately with information about whether the main CMP script
   * has loaded yet and if GDPR has been configured for all users or just EU users. (This requires this
   * command's implementation and this configuration to be in the stub).
   */
  _proto.ping = function ping() {
    return Promise.resolve().then(function () {
      return {
        gdprAppliesGlobally: false,
        // TODO global feature not supported yet
        cmpLoaded: true
      };
    });
  };

  return PingUseCase;
}();

exports.default = PingUseCase;