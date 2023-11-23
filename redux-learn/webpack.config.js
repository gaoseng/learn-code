const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  // sourceMap: true,
  devtool:'source-map',
  devServer: {
    // contentBase: './dist',
    // historyApiFallback: true,
    // inline: true,
    // hot: true,
},
module: {
  rules: [
      {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      }
  ]
},
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname + "/src/index.html")//new 一个这个插件的实例，并传入相关的参数
  }),
  ]
}