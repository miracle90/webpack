// 把源代码转成ast语法树
let esprima = require('esprima')
// 遍历语法树
let estraverse = require('estraverse')
// 把转换后的语法树，重新生成源码
let codegen = require('escodegen')

// 老代码 => 老语法树 => 遍历语法树 => 对语法树进行转换 => 根据新的语法树重新生成新的源代码

// es6 => es语法树 => 遍历箭头函数节点 => 把箭头函数转成普通函数 => 重新生成es5代码

let sourceCode = `function ast(){}`

let astTree = esprima.parse(sourceCode)

let indent = 0

let padding = () => ' '.repeat(indent)

estraverse.traverse(astTree, {
  enter(node) {
    console.log(padding() + '进入 ', node.type)
    if (node.type === 'FunctionDeclaration') {
      node.id.name = 'newAst'
    }
    indent += 2
  },
  leave(node) {
    indent -= 2
    console.log(padding() + '离开 ', node.type)
  }
}) 

const res = codegen.generate(astTree)
console.log(res)

// AST的生成过程分成两步
// 1、词法分析，把语句切成一个一个的单词，'i love you' => ['i', 'love', 'you'] 分词是不关心语法含义了，每个单词被称为token，token数组就成为token流
// 2、语法分析 根据token进行语法分析，生成语法树