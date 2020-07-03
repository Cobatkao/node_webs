/**
 * 用户相关接口
 */

const { checkLogin, addNewUser } = require('../controller/userController')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { handleRedis } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 用户登录 路由
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    // const { username, password } = req.query
    return checkLogin(username, password).then(data => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username
        req.session.realname = data.realname
        // 登录成功后 数据同步 redis
        handleRedis(req.sessionId, req.session)
        console.log('req.session---', req.session)
        return new SuccessModel('登陆成功!')
      }
      return new ErrorModel('登录失败!')
    })
  }

  // 用户注册路由
  if (method === 'POST' && req.path === '/api/user/signup') {
    const { username, password, realname } = req.body
    return addNewUser(username, password, realname).then(data => {

      // 设置 session
      req.session.username = username
      req.session.realname = realname
      // 登录成功后 数据同步 redis
      handleRedis(req.sessionId, req.session)
      console.log('req.session---', req.session)

      return new SuccessModel('注册成功')
    }).catch((err) => {
      console.warn('err', err)
      return new ErrorModel('注册失败!')
    })
  }

  // 登录验证测试
  // if (method === 'GET' && req.path === '/api/user/login-test') {
  //   if (req.session.username) {
  //     return Promise.resolve(
  //       new SuccessModel({
  //         session: req.session
  //       })
  //     )
  //   }
  //   return Promise.resolve(new ErrorModel('尚未登录'))
  // }
}

module.exports = handleUserRouter
