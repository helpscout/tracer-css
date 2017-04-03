"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var harvester = require('seed-harvester');
var packer = require('seed-packer');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

packer();

loaders.push({
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader?importLoaders=1', {
    loader: 'sass-loader',
    options: {
      includePaths: harvester([]),
    }
  }],
  exclude: ['node_modules']
});

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js', // your app's entry point
  ],
  // devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  devtool: false,
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders
  },
  devServer: {
    contentBase: "./dev",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ]
};
