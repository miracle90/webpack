/**
 * file-loader 并不会对文件内容进行任何转换，只是复制一份文件内容，并根据配置为他生成一个唯一的文件名。
 */
const { getOptions, interpolateName } = require('loader-utils')

function loader(content) {
  let options = getOptions(this) || {}
  let filename = interpolateName(this, options.filename, { content })
  // 向输出目录例输出一个文件
  // loaderRunner给的一个方法
  // compilation.assets[filename] = content
  this.emitFile(filename, content)
  // 最后一个loader肯定要返回一个js模块代码，且使用 module.export
  return `module.exports = ${JSON.stringify(filename)}`
}

// 如果你希望得到Buffer，不希望转成字符串，raw = true
loader.raw = true
module.exports = loader