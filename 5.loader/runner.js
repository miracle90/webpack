const path = require('path')
const fs = require('fs')
const { runLoaders } = require('./loader-runner')

// 入口文件
const entry = path.resolve(__dirname, 'src', 'index.js')

// 放在请求串里的叫做内联loader
let request = `inline1-loader!inline2-loader!${entry}`

let rules = [ 
  {
    test: /\.js$/,
    use: ['normal1-loader', 'normal2-loader']
  },
  {
    enforce: 'post',
    test: /\.js$/,
    use: ['post1-loader', 'post2-loader']
  },
  {
    enforce: 'pre',
    test: /\.js$/,
    use: ['pre1-loader', 'pre2-loader']
  }
]

let parts = request.split('!')
let resource = parts.pop()

const resolveLoader = loader => path.resolve(__dirname, 'loader-runner', loader)

const inlineLoaders = parts
const preLoaders = []
const normalLoaders = []
const postLoaders = []

for (let i = 0; i < rules.length; i++) {
  const rule = rules[i];
  if (rule.test.test(resource)) {
    if (rule.enforce === 'pre') {
      preLoaders.push(...rule.use)
    } else if (rule.enforce === 'post') {
      postLoaders.push(...rule.use)
    } else {
      normalLoaders.push(...rule.use)
    }
  }
}

let loaders = [
  ...postLoaders,
  ...inlineLoaders,
  ...normalLoaders,
  ...preLoaders
]

loaders = loaders.map(resolveLoader)

runLoaders({
  // 将要加载和转换的模块路径
  resource,
  // 使用哪些loader来进行转换
  loaders,
  // 上下文对象，一般来说没有用
  context: { name: 'lyy' },
  // 可以自定义读取文件的方法
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  console.log(err)
  console.log(result)
  console.log('result.resourceBuffer.toString() ', result.resourceBuffer.toString('utf8'))
})

