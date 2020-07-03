/**
 * 博客相关接口
 */

const {
  getList,
  getDetail,
  addNewBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blogController')

const { SuccessModel, ErrorModel } = require('../model/resModel')

// 登录验证函数
const loginAuth = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('请先登录！'))
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id || ''

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    // 获取参数
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if (req.query.isadmin) {
      // 管理界面
      const loginAuthResult = loginAuth(req)
      if (loginAuthResult) {// true => 未登录
        return loginAuthResult
      }
      // 强制写死查询自己的博客
      author = req.session.username
    }

    return getList(author, keyword).then(listData => {
      //传递promise到app.js
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return getDetail(id).then(detailData => {
      return new SuccessModel(detailData)
    })
  }

  // 新增博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginAuthResult = loginAuth(req)
    if (loginAuthResult) { // true => 未登录
      return loginAuthResult
    }

    req.body.author = req.session.username
    return addNewBlog(req.body).then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginAuthResult = loginAuth(req)
    if (loginAuthResult) {// true => 未登录
      return loginAuthResult
    }

    return updateBlog(id, req.body).then(updateResult => {
      if (updateResult) {
        return new SuccessModel('更新博客成功!')
      }
      return new ErrorModel('更新博客失败!')
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginAuthResult = loginAuth(req)
    if (loginAuthResult) {// true => 未登录
      return loginAuthResult
    }

    let author = req.session.username
    return deleteBlog(id, author).then(delResult => {
      if (delResult) {
        return new SuccessModel('删除博客成功!')
      }
      return new ErrorModel('删除博客失败!')
    })
  }
}

module.exports = handleBlogRouter
