const fs = require('fs')
const path = require('path')
const readline = require('readline')

const testFile = path.join(__dirname, 'data.json')
console.log('testFile', testFile)

const readFile = fs.createReadStream(testFile)

const rl = readline.createInterface({
  // input: process.stdin,
  input: readFile,
  output: process.stdout
})

rl.question('你如何看待 Node.js ？', (answer) => {
  // TODO：将答案记录在数据库中。
  console.log(`感谢您的宝贵意见：${answer}`);

  rl.close();
});