const path = require('path')

module.exports = {
  mode: 'development',
  devtool: false,
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['normal1-loader', 'normal2-loader']
      },
      {
        enforce: 'post',
        test: /\.js$/,
        use: ['post1-loader', 'post2-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['pre1-loader', 'pre2-loader']
      }
    ]
  },
  plugins: []
}