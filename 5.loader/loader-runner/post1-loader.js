function loader(inputSource) {
  console.log('post1-loader')
  return inputSource + '// post1-loader'
}

loader.pitch = function() {
  console.log('pitch-post1-loader')
}

module.exports = loader
