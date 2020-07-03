const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginAuth = (req, res, next) => {
  if (req.session.username) {
    res.json(new SuccessModel('登录成功!'))
    next()
  } else {
    res.json(new ErrorModel('请先登录!'))
  }
}

module.exports = loginAuth