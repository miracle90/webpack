let babelCore = require('@babel/core')
let types = require('babel-types')
let PluginTransformClasses = require('@babel/plugin-transform-classes')

let sourceCode = `
  class Person {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
  }
`;

let SelfTransformClasses = {
  visitor: {

  }
}

let targetCode = babelCore.transform(sourceCode, {
  plugins: [PluginTransformClasses]
})

console.log(targetCode.code)

// function Person(name) {
//   this.name = name
// }
// Person.prototype.getName = function() {
//   return this.name
// }


