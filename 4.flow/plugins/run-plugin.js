class RunPlugin {
  // 每个插件都有一个apply方法，并且接收compiler
  apply(compiler) {
    // run钩子
    // name对应代码执行来说没有用
    // 对于阅读代码的来说，可以起到提示的作用
    compiler.hooks.run.tap('RunPlugin', () => {
      console.log('RunPlugin 开始编译')
    })
  }
}

module.exports = RunPlugin