const fs = require('fs')
const path = require('path')
const env = process.env.NODE_ENV

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

// 生成写入流
function createWriteStream(filename) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', filename)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a' // 追加模式
  })
  return writeStream
}

const accessWriteStream = createWriteStream('access.log')

// 写访问日志方法
function access(log) {
  writeLog(accessWriteStream, log)
  if (env === 'dev') console.log(log)
}

module.exports = {
  access
}