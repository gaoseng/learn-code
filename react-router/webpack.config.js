const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ]
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname + "/index.html")//new 一个这个插件的实例，并传入相关的参数
  }),
  ],
  devServer: {
    hot: true,
    // publicPath: '/'
    historyApiFallback: true,
  }
}