function loader(inputSource) {
  console.log('normal2-loader')
  return inputSource + '// normal2-loader'
}

loader.pitch = function() {
  console.log('pitch-normal2-loader')
}

module.exports = loader
