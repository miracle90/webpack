const fs = require('fs')
 
// 代表一次编译
class Complication {
  build() {
    console.log('编译一次')
  }
}

// 代表整个的编译过程
class Compiler {
  run() {
    // 开始编译
    this.compile()
    // 如果这个文件变更，会重启一次新的编译
    fs.watchFile('./index.js', () => {
      this.compile()
    })
    // 热更新 = 监听文件变化 + 重新编译 + 通知浏览器更新
  }
  compile() {
    // 每次编译都会创建 compilation
    let complication = new Complication
    complication.build()
  }
}

const compiler = new Compiler()
compiler.run()