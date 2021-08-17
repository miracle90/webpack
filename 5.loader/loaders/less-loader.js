const less = require('less')

/**
 * 
 * @param {*} inputSource 
 * 传入的参数
 * 如果是最后的或者最右边的loader，入参就是模块的内容
 * 如果不是，
 */
function loader(inputSource) {
  // 默认情况下，loader的执行是同步的
  // 但是如果调用了 async 方法，可以把loader执行变成异步
  // this.async() 是 loader-runner 提供的方法
  let callback = this.async()
  less.render(inputSource, { filename: this.source }, (err, output) => {
    callback(null, output.css)
  })
}

module.exports = loader