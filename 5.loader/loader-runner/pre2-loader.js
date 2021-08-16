function loader(inputSource) {
  console.log('pre2-loader')
  return inputSource + '// pre2-loader'
}

loader.pitch = function() {
  console.log('pitch-pre2-loader')
}

module.exports = loader
