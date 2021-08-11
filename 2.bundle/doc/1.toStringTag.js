console.log(Object.prototype.toString.call('foo')) // 描述字符串 [object String]
console.log(Object.prototype.toString.call([]))
console.log(Object.prototype.toString.call(1))
console.log(Object.prototype.toString.call(true))
console.log(Object.prototype.toString.call(null))
console.log(Object.prototype.toString.call(undefined))

let obj1 = { name: 'obj1' }
Object.defineProperty(obj1, Symbol.toStringTag, {
  value: 'Object1'
})
let obj2 = { name: 'obj2' }
Object.defineProperty(obj2, Symbol.toStringTag, {
  value: 'Object2'
})
console.log(Object.prototype.toString.call(obj1))
console.log(Object.prototype.toString.call(obj2))