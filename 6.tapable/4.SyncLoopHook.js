const { SyncLoopHook } = require('tapable')

// 不同的循环执行事件函数，直到函数返回的结果都是 undefined 为止
// 每次循环都是从头开始
const syncLoopHook = new SyncLoopHook(['name', 'age'])

let counter1 = 0
let counter2 = 0
let counter3 = 0

syncLoopHook.tap('1', (name, age) => {
  console.log(1, 'counter1', counter1)

  if (++counter1 === 1) {
    counter1 = 0;
    return;
  }
  return true
})

syncLoopHook.tap('2', (name, age) => {
  console.log(2, 'counter2', counter2)

  if (++counter2 === 2) {
    counter2 = 0;
    return;
  }
  return true;
})

syncLoopHook.tap('3', (name, age) => {
  console.log(3, 'counter3', counter3)

  if (++counter3 === 3) {
    counter3 = 0;
    return;
  }
  return true;
})

syncLoopHook.call('lyy', 10)