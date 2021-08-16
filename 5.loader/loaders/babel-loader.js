const babel = require('@babel/core')

function loader(inputSource) {
  const options = {
    // 转换语法靠的是预设
    presets: ['@babel/preset-env'],
    // 如果这个值不传，默认值false，不会生成sourceMap
    sourceMaps: true,
    filename: this.request.split('!')[1].split('/').pop()
  }
  /**
   * code 转换后的es5代码
   * map 转换后的代码到转换前的代码的映射
   * ast 转换后的抽象语法树
   */
  const { code, map, ast } = babel.transform(inputSource, options)
  // loader可以返回一个值，也可以是多个值，如果是多个值需要使用 this.callback
  // callback是loader-runner提供的一个方法
  // this默认指针是context，默认是空对象，但是在loader-runner
  return this.callback(null, code, map, ast)
  // 在这个loader里，把es6转成了es5，给了webpack
  // 但是webpack只能实现main.js
  // module loader转换的时候，es6 => es5，也有一个map文件
}

module.exports = loader