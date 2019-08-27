"use strict";

var webpack = require('webpack');

var path = require('path');

var CleanWebpackPlugin = require('clean-webpack-plugin');

var WEBPACK_MODE_PRODUCTION = 'production';
var OUTPUT_DIST_FOLDER = 'dist';
var ENTRY_PATH = './src/index.js';
var OUTPUT_FILENAME_DEV = 'cmp.dev.js';
var OUTPUT_FILENAME_PRO = 'cmp.pro.js';

var getMajorVersionFromPackageJsonVersion = function getMajorVersionFromPackageJsonVersion() {
  return JSON.stringify(process.env.npm_package_version.split('.')[0]);
};

var webpackConfig = {
  entry: ['@s-ui/polyfills', ENTRY_PATH],
  output: {
    path: path.resolve(OUTPUT_DIST_FOLDER),
    filename: OUTPUT_FILENAME_DEV,
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|src\/cmp\/infrastructure\/build)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [new webpack.DefinePlugin({
    1: getMajorVersionFromPackageJsonVersion()
  }), new CleanWebpackPlugin([OUTPUT_DIST_FOLDER], {
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