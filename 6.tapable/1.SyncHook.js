const { SyncHook } = require('tapable')

// 参数是一个数组，参数长度有用，代表取真实的call的参数的个数，数组里字符串的名字没用
const syncHook = new SyncHook(['name', 'age'])

// 注册事件
syncHook.tap('1', (name, age) => {
  console.log(1, name, age)
})

syncHook.tap('2', (name, age) => {
  console.log(2, name, age)
})

syncHook.tap('3', (name, age) => {
  console.log(3, name, age)
})

// 触发事件
syncHook.call('name', 12)