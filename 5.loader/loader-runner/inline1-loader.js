function loader(inputSource) {
  console.log('inline1-loader')
  return inputSource + '// inline1-loader'
}

loader.pitch = function() {
  console.log('pitch-inline1-loader')
}

module.exports = loader
