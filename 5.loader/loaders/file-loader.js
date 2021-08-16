const { getOptions, interpolateName } = require('loader-utils')

function loader(content) {
  let options = getOptions(this) || {}
  /**
   * this = loadercontext
   * filename = 文件名生成模板 [hash].[ext]
   * content 文件内容
   */
  let url = interpolateName(this, options.filename, { content })  
}

module.exports = loader