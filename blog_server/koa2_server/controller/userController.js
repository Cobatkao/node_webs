const { generatePwd } = require("../utils/cryp");
const { exec, escape } = require("../db/mysql");

// 登录模块
const checkLogin = async (username, password) => {
  // 生成加密密码
  password = generatePwd(password);
  username = escape(username);
  password = escape(password);

  let sql = `
    SELECT username, realname FROM users WHERE username=${username} AND password=${password};
  `;
  const rows = await exec(sql);
  return rows[0] || {};
};

// 注册模块
const addNewUser = async (username, password, realname) => {
  // 生成加密密码
  password = escape(generatePwd(password));
  username = escape(username);
  realname = escape(realname);

  let sql = `
    INSERT INTO users (username, password, realname) VALUES (${username}, ${password}, ${realname});
  `;
  const rows = await exec(sql);
  return {
    id: rows.insertId,
  };
};

module.exports = {
  checkLogin,
  addNewUser,
};
