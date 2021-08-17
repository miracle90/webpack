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
    alias: {//可以配置别名
      "babel-loader": path.resolve('./loaders/babel-loader.js'),
      "file-loader": path.resolve('./loaders/file-loader.js'),
    },
    //也可以配置loaders加载目录
    // 多的话可以配置modules
    modules: [path.resolve('./loaders'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
        test: /\.(jpg|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            filename: '[hash].[ext]',
            limit: 8 * 1024,
            fallback: path.resolve('./loaders/file-loader.js')
          }
        }]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', // 生成一段js脚本，向页面插入style标签，style的内容就是css文本
          'less-loader' // 把less编译成css
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