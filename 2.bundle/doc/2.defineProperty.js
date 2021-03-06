let obj = {}
let ageValue = 10

Object.defineProperty(obj, 'age', {
  // 是否可修改
  // writable: true,
  // 是否可枚举，for in 是否看到属性
  enumerable: true,
  // 是否可删除，delete 是否可删除
  configurable: true,
  // value: 10,
  // set 和 value 不能共用
  set (newValue) {
    ageValue = newValue
  },
  get () {
    return ageValue
  }
})

console.log(obj.age)
obj.age = 20
console.log(obj.age)

// Object.defineProperty
// Object.defineProperties

// 定义多个属性
Object.defineProperties(obj, {
  k1: {
    value: 'k1',
    enumerable: true
  },
  k2: {
    value: 'k2',
    enumerable: true
  }
})

console.log(obj)