const { exec, escape } = require('../db/mysql')
const { generatePwd } = require('../utils/cryp')

// 登录模块
const checkLogin = (username, password) => {
  // 生成加密密码
  password = generatePwd(password)
  username = escape(username)
  password = escape(password)

  let sql = `
    SELECT username, realname FROM users WHERE username=${username} AND password=${password};
  `
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

// 注册模块
const addNewUser = (username, password, realname) => {
  // 生成加密密码
  password = generatePwd(password)
  username = escape(username)
  password = escape(password)
  realname = escape(realname)

  let sql = `
    INSERT INTO users (username, password, realname) VALUES (${username}, ${password}, ${realname});
  `
  return exec(sql).then(rows => {
    return {
      id: rows.insertId
    }
  })
}

module.exports = {
  checkLogin,
  addNewUser
}
