function loader(inputSource) {
  console.log('inline2-loader')
  return inputSource + '// inline2-loader'
}

loader.pitch = function() {
  console.log('pitch-inline2-loader')
}

module.exports = loader
