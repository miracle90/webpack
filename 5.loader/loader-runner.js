const fs = require("fs")

/**
 * 把loader转成loader对象
 * @param {*} loader loader的绝对路径
 */
function createLoaderObject(loader) {
  let loaderObject = {
    // loader的绝对路径
    path: loader,
    // loader的normal函数
    normal: null,
    pitch: null,
    // 是否要转成Buffer
    raw: false,
    // 存放一些自定义的数据
    data: {},
    // 此loader的pitch方法是否已经执行过
    pitchExecuted: false,
    // 此loader的normal方法是否已经执行过
    normalExecuted: false
  }
}

function runLoaders(options, finalCallback) {
  // 加载的文件
  let resource = options.resource
  let loaders = options.loaders || []
  let loaderContext = options.loaderContext || {} // loader函数执行时上下文对象
  let readResource = options.readResource || fs.readFile
  let loaderObjects = loaders.map(createLoaderObject)
  // 要加载的文件
  loaderContext.resource = resource
  loaderContext.readResource = readResource
  loaderContext.loaders = loaders
  // 当前正在执行的loader的索引
  loaderContext.loaderIndex = loaderIndex
  loaderContext.callback = null
  // 把loader的执行，把同步变成异步
  loaderContext.async = null
  Object.defineProperty(loaderContext, 'request', {
    get() {
      return loaderContext.loaders.map(l => l.path).concat(loaderContext.resource).join('!')
    }
  })
  Object.defineProperty(loaderContext, 'remainingRequest', {
    get() {
      return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(l => l.path).concat(loaderContext.resource).join('!')
    }
  })
  Object.defineProperty(loaderContext, 'currentRequest', {
    get() {
      return loaderContext.loaders.slice(loaderContext.loaderIndex).map(l => l.path).concat(loaderContext.resource).join('!')
    }
  })
  Object.defineProperty(loaderContext, 'previousRequest', {
    get() {
      return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(l => l.path).concat(loaderContext.resource).join('!')
    }
  })
  Object.defineProperty(loaderContext, 'data', {
    get() {
      return loaderContext.loaders[loaderContext.loaderIndex].data
    }
  })
}

// module.exports = {
//   runLoaders
// }

exports.runLoaders = runLoaders