const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FilemanagerWebpackPlugin = require('filemanager-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 在webpack.config.js中拿不到
// console.log('webpack.config.js NODE_ENV ', process.env.NODE_ENV)

// 读取.env这个文件，把这里面的key，value写到process.env对象里
require('dotenv').config({
	path: '.env',
});

console.log(process.env.NODE_ENV);

// 编译是打包的一个环节

// 打包是指整个任务

// 1、找入口文件，进行编译
// 2、再找入口以来的模块，再进入进行递归编译

module.exports = {
	mode: process.env.NODE_ENV,
	/**
	 * eval 使用eval包裹模块代码，方便缓存
	 * source-map 包含行、列、babel映射
	 * cheap-module-source-map 包含行、babel映射，不包含列
	 * cheap 只包含行，不包含列、babel映射
	 * inline 将.map作为DataURI嵌入，不单独生成.map文件，类似于base64
	 * hidden-source-map 会在外部生成sourcemap文件,但是在目标文件里没有建立关联,不能提示错误代码的准确原始位置（应用：线上环境没有map文件，调试的时候关联本地map文件的地址）
	 * nosources-source-map 也会在外部生成sourcemap文件,能找到源始代码位置，但源代码内容为空
	 */
	devtool: false,
	// devtool: 'source-map',
	// devtool: 'cheap-source-map',
	// devtool: 'cheap-module-source-map',
	// devtool: 'eval',
	// devtool: 'eval-source-map',
	// devtool: 'cheap-eval-source-map',
	// devtool: 'cheap-module-eval-source-map',
	// entry: './src/index.js',
	entry: {
		main: './src/index.js',
	},
	output: {
		// 指定输出到硬盘上的目录
		path: path.resolve(__dirname, 'dist'),
		// 表示的是打包生成的index.html文件里面引用资源的前缀
		// publicPath: '/',
		filename: 'main.js',
	},
	// 外部依赖，就不会打包
	externals: {
		// 模块名：全局变量
		jquery: 'jQuery',
		lodash: '_',
	},
	// 如果是 webpack serve 启动的服务，那么自然不需要 watch: true 了
  // 内部启动了一个 express 服务器
	devServer: {
		// 表示的是打包生成的静态文件所在的位置(若是devServer里面的publicPath没有设置，则会认为是output里面设置的publicPath的值)
		// publicPath: '/',
		// 用于配置提供额外静态文件内容的目录
		contentBase: path.resolve('public'),
		// 是否启动压缩，gzip
		compress: true,
		port: 1000,
		open: false,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				pathRewrite: {
					'^/api': '',
				},
			},
		},
		before(app) {
			app.get('/api/users', (req, res) => {
				res.json([{ id: 1, name: 'zhufeng' }]);
			});
		},
	},
	// 默认false,也就是不开启
	// watch: true,
	// // 只有开启监听模式时，watchOptions才有意义
	// watchOptions: {
	// 	// 默认为空，不监听的文件或者文件夹，支持正则匹配
	// 	ignored: /node_modules/,
	// 	// 监听到变化发生后会等300ms再去执行，默认300ms
	// 	aggregateTimeout: 300,
	// 	// 判断文件是否发生变化是通过不停的询问文件系统指定议是有变化实现的，默认每秒问1000次
	// 	poll: 1000,
	// },
	// webpack只能理解 JavaScript 和 JSON
	module: {
		rules: [
			// 向全局对象上也就是window上挂载变量，window._，如果原来已经有值，override 属性决定是否覆盖
			{
				test: require.resolve('lodash'),
				loader: 'expose-loader',
				options: {
					exposes: {
						globalName: '_',
						override: true,
					},
				},
			},
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				// 给loader进行分类，pre => normal => inline => post
				enforce: 'pre',
				// 如果发现不合要求，会自动修复
				options: { fix: true },
				// 不处理
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: [
								['@babel/plugin-proposal-decorators', { legacy: true }],
								['@babel/plugin-proposal-class-properties', { loose: true }],
							],
						},
					},
				],
			},
			{
				test: /\.txt$/,
				use: 'raw-loader',
			},
			// style-loader可以把 CSS 转成 js 脚本，脚本的作用就是向页面中插入 style 标签
			// css-loader用来翻译处理 @import 和 url()
			{
				test: /\.css$/,
				use: [
					'style-loader', // css 转成 js，结果一定要是js，因为它的结果就是给webpack使用
					{
						loader: 'css-loader',
						// 如果有配置项，写成对象
						options: {
							// 要引入别的css文件时，要向下经过几个loader处理
							importLoaders: 1,
							// 是否启用cssModules
							modules: false,
							// modules: {
							//   mode: 'local',
							//   // auto: true,
							//   localIdentName: '[path][name]_[local]--[hash:base64:5]',
							// }
						},
					},
					'postcss-loader', // css 预处理器，处理各厂商的前缀
				],
			},
			{
				test: /\.less$/,
				use: [
					'style-loader', // css 转成 js，结果一定要是js，因为它的结果就是给webpack使用
					{
						loader: 'css-loader',
						// 如果有配置项，写成对象
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader', // css 预处理器，处理各厂商的前缀
					'less-loader',
				],
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader', // css 转成 js，结果一定要是js，因为它的结果就是给webpack使用
					{
						loader: 'css-loader',
						// 如果有配置项，写成对象
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader', // css 预处理器，处理各厂商的前缀
					'sass-loader',
				],
			},
			{
				test: /\.(jpg|png|bmp|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							esModule: false,
							// 这种写法靠 file-loader 转换
							// hash 是根据内容实现的
							name: '[hash:10].[ext]',
							// 以8k为分界线
							// 如果引入的文件小于8kb，就把图片变成base64字符串插入到html中
							// 否则和file-loader一样，生成一个新的文件名，拷贝到dist目录中，返回新的路径名称
							limit: 8 * 1024,
						},
					},
				],
			},
		],
	},
	plugins: [
		// 可以打包前先清空输出目录
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['**/*'],
		}),
		// 可以拷贝源文件到目标目录
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets'),
					to: path.resolve(__dirname, 'dist/static'),
				},
			],
		}),
		// 自动向每个模块内注入 _ 变量
		new webpack.ProvidePlugin({
			_: 'lodash',
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
			append: '\n//# sourceMappingURL=http://127.0.0.1:8080/[url]',
		}),
		new FilemanagerWebpackPlugin({
			events: {
				onEnd: {
					copy: [
						{
							source: './dist/*.map',
							destination: path.resolve('maps'),
						},
					],
					delete: ['./dist/*.map'],
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		// 运行本质是在编译的时候一个纯的字符串替换，并不会定义任何的变量
		// 使用 JSON.stringify 是为了表示是一个字符串
		// new webpack.DefinePlugin({
		//   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		//   'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		// })
	],
};
