const { SuccessModel, ErrorModel } = require("../model/resModel");

const loginAuth = async (ctx, next) => {
  if (ctx.session.username) {
    ctx.body = new SuccessModel("登录成功!");
    await next();
  } else {
    ctx.body = new ErrorModel("请先登录!");
  }
};

module.exports = loginAuth;
