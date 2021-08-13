function toUnitPath(filePath) {
  return filePath.replace(/\\/g, '/')
}

const baseDir = toUnitPath(process.cwd() + '/4.flow') 

console.log(baseDir)
console.log(__dirname)