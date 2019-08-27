"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var CMP_FRAME_ID = 'cmp-frame';
var IFRAME_STYLE_WIDTH = 0;
var IFRAME_STYLE_HEIGHT = 0;
var IFRAME_STYLE_BORDER = 0;
var IFRAME_ATTRIBUTE_SANBOX = 'sandbox';
var IFRAME_ATTRIBUTE_SECURITY = 'allow-same-origin allow-scripts allow-forms allow-top-navigation';

var IframeRegistry =
/*#__PURE__*/
function () {
  function IframeRegistry(_ref) {
    var dom = _ref.dom;
    this._dom = dom;
  }

  var _proto = IframeRegistry.prototype;

  _proto.register = function register(_ref2) {
    var _this = this;

    var url = _ref2.url;

    if (!url) {
      return Promise.reject(new Error('The source URL of global storage html is mandatory'));
    }

    return Promise.resolve(CMP_FRAME_ID).then(function (frameId) {
      return _this._dom.getElementById(frameId);
    }).then(function (optionalIframe) {
      return _this._createIfNotExist({
        dom: _this._dom,
        iframe: optionalIframe,
        url: url
      });
    });
  };

  _proto._createIfNotExist = function _createIfNotExist(_ref3) {
    var dom = _ref3.dom,
        iframe = _ref3.iframe,
        url = _ref3.url;
    return new Promise(function (resolve, reject) {
      if (!iframe) {
        iframe = dom.createElement('iframe');

        iframe.onload = function () {
          return resolve(iframe);
        };

        iframe.onerror = function () {
          return reject(iframe);
        };

        iframe.setAttribute('id', CMP_FRAME_ID);
        iframe.setAttribute('src', url);
        iframe.setAttribute(IFRAME_ATTRIBUTE_SANBOX, IFRAME_ATTRIBUTE_SECURITY);
        iframe.style.width = IFRAME_STYLE_WIDTH;
        iframe.style.height = IFRAME_STYLE_HEIGHT;
        iframe.style.border = IFRAME_STYLE_BORDER;
        dom.body.appendChild(iframe);
      } else {
        resolve(iframe);
      }
    });
  };

  return IframeRegistry;
}();

exports.default = IframeRegistry;