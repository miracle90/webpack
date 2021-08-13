let babelCore = require('@babel/core')
let types = require('babel-types')
let PluginTransformClasses = require('@babel/plugin-transform-classes');
const { identifier, classMethod } = require('babel-types');

let sourceCode = `
  class Parent {

  }
  class Child extends Parent {
    constructor(name) {
      super(name);
      this.name = name;
    }
  }
`;

let SelfTransformClasses = {
  visitor: {
    // 拦截类声明
    ClassDeclaration(nodePath) {
      let { node } = nodePath
      // { type: identifier, name: Person }
      let id = node.id
      let classMethods = node.body.body
      let nodes = []
      classMethods.forEach(classMethod => {
        // 如果这个方法是构造函数
        if (classMethod.kind === 'constructor') {
          let constructor = types.functionDeclaration(id, classMethod.params, classMethod.body)
          nodes.push(constructor)
        } else {
          // 如果是普通函数
          // 创建赋值语句的右侧的函数表达式
          let functionExpression = types.functionExpression(null, classMethod.params, classMethod.body)
          // Person.prototype
          let prototypeExpression = types.memberExpression(id, types.identifier('prototype'))
          // Person.prototype.getName
          let memberExpression = types.memberExpression(prototypeExpression, classMethod.key)
          let assignmentExpression = types.assignmentExpression('=', memberExpression, functionExpression)
          nodes.push(assignmentExpression)
        }
      })
      if (nodes.length === 1) {
        // 如果只要一个节点，使用 replaceWith
        nodePath.replaceWith(nodes[0])
      } else {
        // 如果要替换成多节点，使用 replaceWithMultiple
        nodePath.replaceWithMultiple(nodes)
      }
    }
  }
}

let targetCode = babelCore.transform(sourceCode, {
  plugins: [PluginTransformClasses]
  // plugins: [SelfTransformClasses]
})

console.log(targetCode.code)

// function Person(name) {
//   this.name = name
// }
// Person.prototype.getName = function() {
//   return this.name
// }

// 赋值语句
// 左边是成员表达式 = 函数表达式
// 成员表达式 + 属性
// Object + property



