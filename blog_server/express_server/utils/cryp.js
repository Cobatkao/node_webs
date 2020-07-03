const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'WJiol_8776#'

// md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 生成加密后的密码
function generatePwd(pwd) {
  let temp = `password=${pwd}&key=${SECRET_KEY}`
  return md5(temp)
}

module.exports = {
  generatePwd
}
