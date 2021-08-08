const path = require('path')

// 一定是绝对路径
console.log('path.resolve(\'a\', \'b\') ', path.resolve('a', 'b'))

// 不一定是绝对
console.log('path.join(\'a\', \'b\') ', path.join('a', 'b'))
