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
        // 生成一个base64字符串，url-loader
        // 不需要设置阈值，不能设置
        type: 'asset/inline'
      },
      {
        test: /\.txt$/,
        // 相当于 raw-loader
        type: 'asset/source'
      },
      {
        test: /\.jpg$/,
        // 如果想设置阈值，配置这个
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      }
    ]
  },
  devServer: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  // 实验性的配置
  expreiments: {
    asset: true
  }
}