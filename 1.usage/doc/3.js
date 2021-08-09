let crypto = require('crypto')
let fs = require('fs')

let content = fs.readFileSync('/Users/11112733/project/webpack/1.usage/public/1.png')
// digest 16进制表示
let hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 10)
console.log(hash)