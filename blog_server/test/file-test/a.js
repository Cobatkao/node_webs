const fs = require('fs')
const path = require('path')

/**
 * 不使用流
 */

// 读取文本
const filePath = path.resolve(__dirname, 'data.json')
const infoPath = path.resolve(__dirname, 'info.json')
// fs.readFile(filePath, (err, data) => {
//   if (err) {
//     console.warn(err)
//     return
//   }
//   console.log(data.toString());
// })

// // 写入文件
// const content = '这是新写入的内容！'
// const opt = {
//   flag: 'a' // 追加写入，覆盖使用'2'
// }
// fs.writeFile(filePath, content, opt, (err) => {
//   if (err) {
//     console.warn(err)
//   }
// })

// // 判断文件内容是否存在
// fs.exists(filePath, (exist) => {
//   console.log(exist) // true
// })

/**
 * 使用流
 */

let ct = fs.createWriteStream(infoPath)
let rel = fs.createReadStream(filePath).pipe(ct)
console.log('ct',ct);
