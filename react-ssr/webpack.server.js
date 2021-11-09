const path = require('path');
const nodeTxternals = require('webpack-node-externals');
const {merge} = require('webpack-merge');
const webpackBase = require('./webpack.base');

module.exports = merge(webpackBase,{
  target: 'node',
  entry: './src/server/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'server.js'
  },
  // 告诉webpack不要把核心模块打包进去
  externals: [nodeTxternals()]
})