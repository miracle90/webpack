// const webpack = require('webpack')
const webpack = require('./webpack')
const webpackOptions = require('./webpack.config')
// compiler代表整个编译过程
const compiler = webpack(webpackOptions)
// 调用它的run方法，可以启动编译
compiler.run((err, stats) => {
  let result = stats.toJson(
    {
      // 生成了哪些文件
      files: true,
      // 生成了哪些资源
      assets: true,
      // 生成了哪些代码块
      chunk: true,
      // 模块信息
      modules: true,
      // 入口信息
      entries: true
    }
  )
  console.log(JSON.stringify(result, null, 2))
})