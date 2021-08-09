// import style from './index.css'
// import './index.css'
// import './less.less'
// import './sass.scss'

// console.log(style)

// let logo = require('./assets/1.png')

// console.log(logo)

// let img = new Image();

// img.src = logo;

// document.body.appendChild(img)


/**
 * writable
 * configurable
 * enumerable
 */

/**
 * 
 * @param {*} target 
 * @param {*} key 
 * @param {*} descriptor 
 */
function readonly(target, key, descriptor) {
  // 类的实例
  console.log(target)
  // 属性，PI
  console.log(key)
  // 对象的这个属性不能修改
  descriptor.writable = false
}

class Circle {
  // readonly是js的高级语法，不是ts
  @readonly PI = 3.14
}

let c1 = new Circle()

c1.PI = 3.15

console.log(c1.PI)