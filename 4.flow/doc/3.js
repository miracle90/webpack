let reg = /\.js$/

let path = 'entry1.js'

console.log(
  reg.test(path)
)

console.log(
  path.match(reg)
)

