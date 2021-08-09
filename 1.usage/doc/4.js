const fs = require('fs')
const path = require('path')

const { config } = require('dotenv')
config({ path: path.resolve('config/.env') })

function config({ path }) {
  let content = fs.readFileSync(path, 'utf-8')
  content.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    process.env[key] = value
  })
}