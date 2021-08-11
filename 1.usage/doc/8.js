function createHash() {
  return require('crypto').createHash('md5')
}

let entry = {
  entry1: 'entry1',
  entry2: 'entry2',
}

let entry1 = 'require("./depModule1")'
let entry2 = 'require("./depModule2")'

let depModule1 = 'depModule1'
let depModule2 = 'depModule2'

// 只要有任何一个模块改变，hash就会改变
let hash = createHash()
.update(entry1)
.update(entry2)
.update(depModule1)
.update(depModule2)
.digest('hex')
console.log(hash)

// chunkhash
let entry1ChunkHash = createHash()
.update(entry1)
.update(depModule1)
.digest('hex')
console.log(entry1ChunkHash)

// contenthash，内容hash只跟内容有关，内容不变，contentHa sh不变
let entry1File = entry1 + depModule1
let entry1ContentHash = createHash()
.update(entry1File)
.digest('hex')
console.log(entry1ContentHash)

/**
 * 如何选择
 * 
 * hash，chunkHash，contentHash 生成的成本越来越高，影响的范围越来越小
 * 
 * 文件变化的概率特别小，可以选择contentHash
 * 
 * 每次都要变，选择hash
 */

// moduleId

