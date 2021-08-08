const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 在webpack.config.js中拿不到
console.log('webpack.config.js NODE_ENV ', process.env.NODE_ENV)

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: false,
  // entry: './src/index.js',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  // webpack只能理解 JavaScript 和 JSON
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 运行本质是在编译的时候一个纯的字符串替换，并不会定义任何的变量
    // 使用 JSON.stringify 是为了表示是一个字符串
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}