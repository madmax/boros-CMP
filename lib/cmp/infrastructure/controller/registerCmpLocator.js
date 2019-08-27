"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var CMP_LOCATOR_NAME = '__cmpLocator';

var registerCmpLocator = function registerCmpLocator(_ref) {
  var dom = _ref.dom;
  return Promise.resolve().then(function () {
    return dom.getElementsByName(CMP_LOCATOR_NAME);
  }).then(function (elements) {
    if (elements && elements.length) {
      return elements[0];
    } else {
      var iFrame = dom.createElement('iframe');
      iFrame.style.display = 'none';
      iFrame.name = CMP_LOCATOR_NAME;
      dom.body.appendChild(iFrame);
      return iFrame;
    }
  });
};

var _default = registerCmpLocator;
exports.default = _default;