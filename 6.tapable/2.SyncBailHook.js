/**
 * 同步保险钩子
 */
const { SyncBailHook } = require('tapable')

// 参数是一个数组，参数长度有用，代表取真实的call的参数的个数，数组里字符串的名字没用
const syncBailHook = new SyncBailHook(['name', 'age'])

// 注册事件
synsyncBailHookcHook.tap('1', (name, age) => {
  console.log(1, name, age)
})

syncBailHook.tap('2', (name, age) => {
  console.log(2, name, age)
  // 只要有非undefined得返回值，跳过第三个
  return '2'
})

syncBailHook.tap('3', (name, age) => {
  console.log(3, name, age)
})

// 触发事件
syncBailHook.call('name', 12)