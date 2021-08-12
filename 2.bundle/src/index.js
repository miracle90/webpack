// import title, { age } from './title';

// console.log(title)
// console.log(age)
// let title = require('./title')

// console.log(title)

// console.log(title.age)
let b = document.querySelector('#load')
b.addEventListener('click', () => {
  // import 为 js 内置语法，webpack 遇到这种，会把它当做天然的代码分割点
  import(/* webpackChunkName: "title" */'./title').then(res => {
    console.log(res)
  })
})