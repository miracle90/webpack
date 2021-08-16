// normal，必须要有
function loader(inputSource) {
  console.log('normal1-loader')
  return inputSource + '// normal1-loader'
}

// 可有可无
loader.pitch = function() {
  console.log('pitch-normal1-loader')
}

module.exports = loader

// pre => normal => inline => post