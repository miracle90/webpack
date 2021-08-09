const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 在webpack.config.js中拿不到
// console.log('webpack.config.js NODE_ENV ', process.env.NODE_ENV)

// 读取.env这个文件，把这里面的key，value写到process.env对象里
require('dotenv').config({
  path: '.env'
})

console.log(process.env.NODE_ENV)

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: false,
  // entry: './src/index.js',
  entry: {
    main: './src/index.js'
  },
  output: {
    // 指定输出到硬盘上的目录
    path: path.resolve(__dirname, 'dist'),
    // 表示的是打包生成的index.html文件里面引用资源的前缀
    // publicPath: '/',
    filename: 'main.js'
  },
  devServer: {
    // 表示的是打包生成的静态文件所在的位置(若是devServer里面的publicPath没有设置，则会认为是output里面设置的publicPath的值)
    // publicPath: '/',
    // 用于配置提供额外静态文件内容的目录
    contentBase: path.resolve('public'),
    // 是否启动压缩，gzip 
    compress: true,
    port: 0713,
    open: false
  },
  // webpack只能理解 JavaScript 和 JSON
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }]
              ]
            }
          }
        ]
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      // style-loader可以把 CSS 转成 js 脚本，脚本的作用就是向页面中插入 style 标签
      // css-loader用来翻译处理 @import 和 url()
      {
        test: /\.css$/,
        use: [
          'style-loader', // css 转成 js，结果一定要是js，因为它的结果就是给webpack使用
          {
            loader: 'css-loader',
            // 如果有配置项，写成对象
            options: {
              // 要引入别的css文件时，要向下经过几个loader处理
              importLoaders: 1,
              // 是否启用cssModules
              modules: false,
              // modules: {
              //   mode: 'local',
              //   // auto: true,
              //   localIdentName: '[path][name]_[local]--[hash:base64:5]',
              // }
            }
          },
          'postcss-loader' // css 预处理器，处理各厂商的前缀
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', // css 转成 js，结果一定要是js，因为它的结果就是给webpack使用
          {
            loader: 'css-loader',
            // 如果有配置项，写成对象
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader', // css 预处理器，处理各厂商的前缀
          'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // css 转成 js，结果一定要是js，因为它的结果就是给webpack使用
          {
            loader: 'css-loader',
            // 如果有配置项，写成对象
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader', // css 预处理器，处理各厂商的前缀
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/, 
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              // 这种写法靠 file-loader 转换
              // hash 是根据内容实现的
              name: '[hash:10].[ext]',
              // 以8k为分界线
              // 如果引入的文件小于8kb，就把图片变成base64字符串插入到html中
              // 否则和file-loader一样，生成一个新的文件名，拷贝到dist目录中，返回新的路径名称
              limit: 8 * 1024
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 运行本质是在编译的时候一个纯的字符串替换，并不会定义任何的变量
    // 使用 JSON.stringify 是为了表示是一个字符串
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //   'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // })
  ]
}