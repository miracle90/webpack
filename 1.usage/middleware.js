const express = require('express');
const webpack = require('webpack');

const app = express();
const WebpackDevMiddleware = require('webpack-dev-middleware');
const webpackOptions = require('./webpack.config');

webpackOptions.mode = 'development';
// compiler是一个webpack的实例，代表整个编译的任务 compiler.run() 启动编译
const compiler = webpack(webpackOptions);
/**
 * webpack-dev-server 自己启动了一个express的http服务器，而且能实现打包的功能，并且可以提供产出文件的访问服务
 * webpack-dev-middleware只是一个中间件，它可以嵌入到现有的express服务中，提供打包功能，并且可以提供产出文件的功能
 * app.use(WebpackDevMiddleware(compiler, {}));
 * 1、会自动按配置文件的要求打包项目
 * 2、会提供打包后的文件的访问服务
 */
app.use(WebpackDevMiddleware(compiler, {}));
app.listen(3000);
