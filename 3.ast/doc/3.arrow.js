// babel的核心包，1、把源代码转成语法树 2、可以遍历语法树 3、最后再根据转换后的语法树生成新的源代码
// 本身并不知道如何转换代码
let babelCore = require('@babel/core')
// babel的工具包，判断某个节点是不是某个类型，动态创建某个类型的节点
let types = require('babel-types')
// 插件负责转换代码，其实就是一个钩子函数，在遍历语法树的过程中，可以捕获某些特别类型的节点并进行转换
let ArrowFunctionsPlugin = require('babel-plugin-transform-es2015-arrow-functions')
// 所有的插件打成一个包，就是preset @babel/preset-env 插件集合，包括基本上所有的es6转换插件

let sourceCode = `const sum = (a, b) => {
  console.log(this)
  return a + b
}`;

// 插件就是一个对象，对象里会有一个 visitor 的访问器
let SelfArrowFuncPlugin = {
  // 每个插件都有自己的访问器
  // 访问者模式
  visitor: {
    // 处理所有的箭头函数节点，参数是节点的所在路径
    ArrowFunctionExpression(nodePath) {
      let { node } = nodePath
      // console.log(node)
      // 处理 this 的指针的问题
      hoistFunctionEnvironment(nodePath)
      node.type = 'FunctionExpression'
    }
  }
}

function hoistFunctionEnvironment(fnPath) {
  // 从当前的路径向上查找，查找this定义的位置
  const thisEnvFn = fnPath.findParent(p => {
    // 作用域只有两个，全局 / 函数
    // 找不是箭头函数的函数 || 全局作用域
    return (p.isFunction() && !p.isArrayFunctionExpression()) || p.isProgram()
  })
  // 找一找当前作用域哪些地方用到了this的路径
  let thisPaths = getScopeInfoInformation(fnPath)
  // 先声明一个变量，把 this 变成 _this
  let thisBinding = '_this'
  // 如果子节点里有 this 指针调用的话
  if (thisPaths.length > 0) {
    // 生成 var _this = this;
    // 向此路径内的作用域内添加一个变量
    thisEnvFn.scope.push({
      // 生成一个标识符 _this
      id: types.identifier(thisBinding),
      // 生成一个this调用
      init: types.thisExpression()
    })
    // 修改变量 this => _this
    thisPaths.forEach(thisPath => {
      let thisBindingIdentifier = types.identifier(thisBinding)
      // 把此路径上面挂在的节点进行替换，this => _this
      thisPath.replaceWith(thisBindingIdentifier) 
    })
  }
}

function getScopeInfoInformation(fnPath) {
  let thisPaths = []
  // 遍历当前路径的子路径
  // 从当前的路径向下查找，如果遇到 ThisExpression 节点，就把它的路径添加到 thisPaths 数组里
  fnPath.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath)
    }
  })
  return thisPaths
}

let targetCode = babelCore.transform(sourceCode, {
  // presets: ["@babel/preset-env"]
  plugins: [SelfArrowFuncPlugin]
  // plugins: [ArrowFunctionsPlugin]
})

console.log(targetCode.code)

// var _this = this;
// const sum = function (a, b) {
//   console.log(_this);
//   return a + b;
// };

/**
 * 这个涉及到插件编写的一个原则
 * 尽可能复用老的设施
 */