"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _cleanWebpackPlugin = _interopRequireDefault(require("clean-webpack-plugin"));

var WEBPACK_MODE_PRODUCTION = 'production';
var OUTPUT_DIST_FOLDER = 'dist';
var ENTRY_PATH = './src/global.js';
var OUTPUT_FILENAME_DEV = 'global.dev.js';
var OUTPUT_FILENAME_PRO = 'global.pro.js';
var webpackConfig = {
  entry: ENTRY_PATH,
  output: {
    path: _path.default.resolve(OUTPUT_DIST_FOLDER),
    filename: OUTPUT_FILENAME_DEV,
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [new _cleanWebpackPlugin.default([OUTPUT_DIST_FOLDER], {
    verbose: true,
    root: process.cwd()
  })]
};

module.exports = function (env, argv) {
  if (argv.mode === WEBPACK_MODE_PRODUCTION) {
    webpackConfig.output.filename = OUTPUT_FILENAME_PRO;
  }

  return webpackConfig;
};