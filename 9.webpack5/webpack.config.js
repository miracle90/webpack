const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  cache: {
    type: 'filesystem',  //'memory' | 'filesystem'
    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack'),
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-react"
              ]
            },

          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        // 拷贝文件，file-loader
        type: 'asset/resource'
      },
      {
        test: /\.ico$/,
        // 生成一个base64字符串
        type: 'asset/inline'
      }
    ]
  },
  devServer: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}