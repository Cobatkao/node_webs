const express = require("express");
const router = express.Router();

const { checkLogin, addNewUser } = require("../controller/userController");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 登录
router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  return checkLogin(username, password).then((data) => {
    console.log("login data", data);
    // 若数据库存在数据则通过认证
    if (data.username) {
      // 将数据库取回的数据赋值给session，并自动同步redis
      req.session.username = data.username;
      req.session.realname = data.realname;
      res.json(new SuccessModel("登录成功!"));
      return;
    }
    res.json(new ErrorModel("登录失败!"));
  });
});

// 注册
router.post("/signup", function (req, res, next) {
  const { username, password, realname } = req.body;
  return addNewUser(username, password, realname).then((data) => {
    if (data.id) {
      return res.json(new SuccessModel("注册成功!"));
    }
    return res.json(new ErrorModel("注册失败!"));
  });
});

module.exports = router;
