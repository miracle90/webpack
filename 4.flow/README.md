## 调试方法


### 1、通过 chrome 调试

```
node --inspect-brk ./node_modules/webpack-cli/bin/cli.js
```

ws://127.0.0.1:9229/fdae4019-8f63-4fe7-8b63-cb84d6be8c2b

### 2、通过执行命令

* 打开工程目录，点击调试按钮，再点击小齿轮的配置按钮系统就会生成 launch.json 配置文件
* 修改好了以后直接点击 F5 就可以启动调试

.vscode\launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "debug webpack",
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/node_modules/webpack-cli/bin/cli.js"
    }
  ]
}
```

### 3、debugger.js

```js
const webpack = require("webpack");
const webpackOptions = require("./webpack.config");
const compiler = webpack(webpackOptions);

//4.执行对象的run方法开始执行编译
compiler.run((err, stats) => {
  console.log(err);
  console.log(stats.toJson(
    {
      assets: true,
      chunks: true,
      modules: true,
      entries: true,
    }
  ));
});
```

## webpack 工作流

1. 初始化参数：从配置文件和Shell语句中读取并合并参数,得出最终的配置对象
2. 用上一步得到的参数初始化Compiler对象
3. 加载所有配置的插件
4. 执行对象的run方法开始执行编译
5. 根据配置中的entry找出入口文件
6. 从入口文件出发,调用所有配置的Loader对模块进行编译
7. 再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
8. 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
9. 再把每个Chunk转换成一个单独的文件加入到输出列表
10. 在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

> 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果

### Compiler 作用

Compiler相当于是一个工厂

### Complication 作用

一个生产过程