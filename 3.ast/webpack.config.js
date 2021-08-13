const path = require('path');
module.exports = {
	mode: 'development',
  devtool: false,
	entry: './src/index.js',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
              // import 实现按需加载，目前只支持几个库 antd lodash antd-mobile
              // [
              //   'import',
              //   {
              //     'libraryName': 'lodash',
              //     'libraryDirectory': ''
              //   }
              // ]
							[
								path.resolve(__dirname, 'plugins/babel-plugin-import.js'),
								{
                  // 只有这个库走这个插件
									libraryName: 'lodash',
								},
							],
						],
					},
				},
			},
		],
	},
};
