// 这个写法会打包整个库
import { flatten, concat } from 'lodash'

// 这种写法只会打包这两个文件，不包含其他文件
// import flatten from 'lodash/flatten'
// import concat from 'lodash/concat'

console.log(flatten)
console.log(concat)