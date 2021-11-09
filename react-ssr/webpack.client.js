const path = require('path');
const {merge} = require('webpack-merge');
const webpackBase = require('./webpack.base');
console.log(typeof merge)
module.exports = merge(webpackBase, {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'client.js'
  },
})