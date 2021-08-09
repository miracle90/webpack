let postCSSPresetEnv = require('postcss-preset-env')

// postcss-loader生效需要配置
module.exports = {
  plugins: [
    postCSSPresetEnv({
      browsers: 'last 10 version'
    })
  ]
}