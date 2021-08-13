function loader(inputSource) {
  console.log('post2-loader')
  console.log(this.name)
  return inputSource + '// post2-loader'
}

loader.pitch = function() {
  console.log('pitch-post2-loader')
}

module.exports = loader
