const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')

// 创建readstream
const readStream = fs.createReadStream(fileName)

// 创建readline对象
const rl = readline.createInterface({
  input: readStream
})

let chrome = 0
let sum = 0

// 逐行读取
rl.on('line', (lineData) => {
  if (!lineData) {
    return
  }
  sum++
  console.log(sum);
  
  const lineArr = lineData.split('---')
  if (lineArr[2] && lineArr[2].indexOf('Chrome') > 0) {
    chrome++ //累加chrome
    console.log(chrome);
    
  }
})

// 监听读取完成
rl.on('close', () => {
  const r = chrome / sum
  console.log(r);
  
  console.log(`Chrome浏览器占比是：${r.toFixed(3)*100}%`); //e.g. Chrome浏览器占比是：15.8%
})