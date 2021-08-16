function loader(inputSource) {
  console.log('pre1-loader')
  return inputSource + '// pre1-loader'
}

loader.pitch = function() {
  console.log('pitch-pre1-loader')
}

module.exports = loader
