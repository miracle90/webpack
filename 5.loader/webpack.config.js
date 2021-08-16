const { resolve } = require('path')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: false,
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolveLoader: {
    alias: {
      'babel-loader': resolve('./loaders/babel-loader.js')
    },
    // 多的话可以配置modules
    modules: [path.resolve('./loaders'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: ['babel-loader']
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // 如果这个参数不传，默认false，不会生成sourceMap
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              filename: '[hash].[ext]'
            }
          }
        ]
      }
      // {
      //   test: /\.js$/,
      //   use: ['normal1-loader', 'normal2-loader']
      // },
      // {
      //   enforce: 'post',
      //   test: /\.js$/,
      //   use: ['post1-loader', 'post2-loader']
      // },
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   use: ['pre1-loader', 'pre2-loader']
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}