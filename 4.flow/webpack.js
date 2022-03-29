// 1. 初始化参数：从配置文件和Shell语句中读取并合并参数,得出最终的配置对象
// 2. 用上一步得到的参数初始化Compiler对象
// 3. 加载所有配置的插件
// 4. 执行对象的run方法开始执行编译
// 5. 根据配置中的entry找出入口文件
// 6. 从入口文件出发,调用所有配置的Loader对模块进行编译
// 7. 再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
// 8. 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
// 9. 再把每个Chunk转换成一个单独的文件加入到输出列表
// 10. 在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

// > 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果

const Compiler = require("./webpack.compiler");

function webpack(options) {
  let shellConfig = process.argv.slice(2).reduce((shellConfig, item) => {
    let [key, value] = item.split("=");
    shellConfig[key.slice(2)] = value;
    return shellConfig;
  }, {});
  // 1. 初始化参数：从配置文件和Shell语句中读取并合并参数,得出最终的配置对象
  let finalConfig = { ...options, ...shellConfig };
  // 2. 用上一步得到的参数初始化Compiler对象
  let compiler = new Compiler(finalConfig);
  // 3. 加载所有配置的插件
  let { plugins } = finalConfig;
  for (const plugin of plugins) {
    // 每个插件都有一个apply方法，并且接收Compiler的实例
    plugin.apply(compiler);
  }
  return compiler;
}

module.exports = webpack;
