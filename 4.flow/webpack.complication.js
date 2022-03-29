const path = require("path");
const fs = require("fs");
const types = require("babel-types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

function toUnitPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

const baseDir = toUnitPath(process.cwd() + "/4.flow");

class Complication {
  constructor(options) {
    this.options = options;
    // webpack4使用数组实现 => webpack5使用set实现，为了去重
    // 所有的入口
    this.entries = [];
    // 所有的模块
    this.modules = [];
    // 所有的代码块
    this.chunks = [];
    // 所有产出的资源
    this.assets = {};
    // 所有产出的文件
    this.files = [];
  }
  build(callback) {
    // 5. 根据配置中的entry找出入口文件
    let entry = {};
    if (typeof this.options.entry === "string") {
      entry.main = this.options.entry;
    } else {
      entry = this.options.entry;
    }
    // enry: {
    //   entry1: './src/entry1.js',
    //   entry2: './src/entry2.js'
    // }
    for (const entryName in entry) {
      // 获取入口的绝对路径
      let entryFilePath = path.join(this.options.context, entry[entryName]);
      // 6. 从入口文件出发,调用所有配置的Loader对模块进行编译
      let entryModule = this.buildModule(entryName, entryFilePath);
      // this.modules.push(entryModule);
      // 8. 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
      // 同样 name 的，组成一个代码块
      let chunk = {
        name: entryName,
        entryModule,
        modules: this.modules.filter((item) => item.name === entryName),
      };
      this.entries.push(chunk);
      this.chunks.push(chunk);
    }
    // console.log("this.modules ", this.modules);
    // 9. 再把每个Chunk转换成一个单独的文件加入到输出列表
    this.chunks.forEach((chunk) => {
      let filename = this.options.output.filename.replace("[name]", chunk.name);
      // this.assets就是输出的列表，key输出的文件名，value就是输出的内容
      this.assets[filename] = getSource(chunk);
    });
    // console.log('+++---',this.assets)
    // 10. 在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
    this.files = Object.keys(this.assets);
    console.log("this.files ", this.files);
    for (const filename in this.assets) {
      let filePath = path.join(this.options.output.path, filename);
      console.log("filePath", filePath);
      /**
       * 文件路径
       * 文件内容
       * 编码
       */
      fs.writeFileSync(filePath, this.assets[filename], "utf-8");
    }
    console.log("完毕");
    callback(null, {
      toJson: () => {
        return {
          entries: this.entries,
          chunks: this.chunks,
          modules: this.modules,
          files: this.files,
          assets: this.assets,
        };
      },
    });
  }
  // 名称，模块的绝对路径
  buildModule(name, modulePath) {
    // 读取模块文件的内容
    let sourceCode = fs.readFileSync(modulePath, "utf-8");
    let rules = this.options.module.rules;
    let loaders = [];
    for (let i = 0; i < rules.length; i++) {
      // 找到匹配当前文件后缀的loader
      if (rules[i].test.test(modulePath)) {
        loaders = [...loaders, ...rules[i].use];
      }
    }
    // 使用reduceRight从后向前，循环loaders，对源代码进行处理
    sourceCode = loaders.reduceRight((sourceCode, loader) => {
      return require(loader)(sourceCode);
    }, sourceCode);
    // console.log(sourceCode);
    // 7. 再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
    // 获得当前模块的模块id ./src/index.js
    let moduleId = "./" + path.posix.relative(baseDir, modulePath);
    let module = {
      id: moduleId,
      dependencies: [],
      name,
    };
    // parser：可以把源码转换成AST
    let ast = parser.parse(sourceCode, {
      sourceType: "module",
    });
    // babel/traverse：用于对 AST 的遍历，维护了整棵树的状态，并且负责替换、移除和添加节点
    traverse(ast, {
      CallExpression: ({ node }) => {
        if (node.callee.name === "require") {
          // 依赖模块的相对路径
          let moduleName = node.arguments[0].value;
          // 获取当前模块的所在的目录
          let dirname = path.posix.dirname(modulePath); // 使用 /
          let depModulePath = path.posix.join(dirname, moduleName);
          let extensions = this.options.resolve.extensions;
          depModulePath = tryExtensions(depModulePath, extensions);
          // 得到依赖的模块ID
          // 相对于项目根目录的相对路径
          let depModuleId = "./" + path.posix.relative(baseDir, depModulePath);
          // 创建一个字符串的文本节点，作为方法调用的参数
					// types：用来生成或者判断节点的AST语法树的节点
          node.arguments = [types.stringLiteral(depModuleId)];
          // 把依赖的模块id，放到当前的模块的依赖的数组里
          // 去重
          // let importedModuleIds = this.modules.map(item => item.id);
          // if (!importedModuleIds.includes(depModuleId)) {
          //   module.dependencies.push({ depModuleId, depModulePath });
          // }
          module.dependencies.push({ depModuleId, depModulePath });
        }
      },
    });
    // generator：可以把AST生成源码，同时生成sourcemap
    let { code } = generator(ast);
    // 模块源代码指向语法树转换后的新生成的源代码
    module._source = code;
    // 7. 再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
    module.dependencies.forEach(({ depModuleId, depModulePath }) => {
      // console.log("-----------", this.modules, depModuleId);
      let depModule = this.modules.find((item) => item.id === depModuleId);
      if (depModule) {
        this.modules.push({ ...depModule, name });
      } else {
        // 递归它依赖的模块
        let dependencyModule = this.buildModule(name, depModulePath);
        this.modules.push(dependencyModule);
      }
    });
    return module;
  }
}

function getSource(chunk) {
  return `
    (() => {
      var modules = ({
        ${chunk.modules
          .map(
            (module) => `
            "${module.id}": (module, exports, require) => {
              ${module._source}
            }
          `
          )
          .join(",")}
      });
      var cache = {};
      function require(moduleId) {
        var cachedModule = cache[moduleId];
        if (cachedModule !== undefined) {
          return cachedModule.exports;
        }
        var module = (cache[moduleId] = {
          exports: {},
        });
        modules[moduleId](module, module.exports, require);
        return module.exports;
      }
      var __webpack_exports__ = {};
      (() => {
        ${chunk.entryModule._source}
      })();
    })();
  `;
}

function tryExtensions(modulePath, extensions) {
  extensions.unshift("");
  for (let i = 0; i < extensions.length; i++) {
    let filePath = modulePath + extensions[i];
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  throw new Error(`Module not found`);
}

module.exports = Complication;
