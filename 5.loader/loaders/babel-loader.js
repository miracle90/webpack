const babel = require('@babel/core')
const path = require('path')

function loader(inputSource) {
  const { getOptions } = require('loader-utils')
  let options = getOptions(this) || {}
  options.filename = path.basename(this.resourcePath)
  let { code, map, ast } = babel.transform(inputSource, options)
  return this.callback(null, code, map, ast)
}

module.exports = loader