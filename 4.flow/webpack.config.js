const path = require('path')
const RunPlugin = require('./plugins/run-plugin')
const DonePlugin = require('./plugins/done-plugin')

module.exports = {
  mode: 'development',
  devtool: false,
  // 当前命令行执行所在的目录，默认值就是 process.cwd()
  context: __dirname,
  // context: process.cwd(),
  // .代表 context 的值
  // entry: './src/index.js'
  entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve(__dirname, 'loaders', 'logger1-loader.js'),
          path.resolve(__dirname, 'loaders', 'logger2-loader.js')
        ]
      }
    ]
  },
  plugins: [
    // 插件放的顺序一般没有影响，前提：不是一个钩子
    new RunPlugin(),
    new DonePlugin()
  ]
}