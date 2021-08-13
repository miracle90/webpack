const fs = require('fs')
const { SyncHook } = require('tapable');
const Complication = require('./webpack.complication')

class Compiler {
	constructor(options) {
		this.options = options;
		this.hooks = {
			// 开始编译
			run: new SyncHook(),
			// 会在将要写入文件的时候触发
			emit: new SyncHook(),
			// 将会在完成编译的时候触发，全部完成
			done: new SyncHook(),
		};
	}
  // 4. 执行对象的run方法开始执行编译
	run(callback) {
		console.log('Compiler开始变异了');
    // 触发run钩子
    this.hooks.run.call()
    /**
     * 中间是我们的编译流程
     */
    // 5. 根据配置中的entry找出入口文件
    this.compile(callback)
    // 监听入口的文件变化，如果文件变化，会重新开始编译
    // Object.keys(this.options.entry).forEach(entry => {
    //   fs.watchFile(entry, () => this.compile(callback))
    // })
    // 编译之后触发done钩子
    this.hooks.done.call()

		// callback(null, {
		// 	toJson() {
		// 		return {
		// 			// 生成了哪些文件
		// 			files: [],
		// 			// 生成了哪些资源
		// 			assets: [],
		// 			// 生成了哪些代码块
		// 			chunk: [],
		// 			// 模块信息
		// 			modules: [],
		// 			// 入口信息
		// 			entries: [],
		// 		};
		// 	},
		// });
	}
  compile(callback) {
    // 每次编译都会创建 compilation
    let complication = new Complication(this.options)
    complication.build(callback)
  }
}

module.exports = Compiler;
