const qs = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { handleRedis } = require('./src/db/redis')
const { access  } = require('./src/utils/log') 

// 储存session的全局数据
// const SESSION_DATA = {}

//  获取 postdata
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    // 以流的方式处理post
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      // 如果没有数据
      if (!postData) {
        resolve({})
        return
      }
      // 成功后的数据
      resolve(JSON.parse(postData))
    })
  })
}

const initServer = (req, res) => {
  // 记录access log
  access(`${req.method} --- ${req.url} --- ${req.headers['user-agent']} --- ${Date.now()}`)

  res.setHeader('content-type', 'application/json')

  // 获取 path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析 query
  req.query = qs.parse(url.split('?')[1])

  //获取并解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const temp = item.split('=')
    const [key, value] = temp
    req.cookie[key] = value
  })

  // 通过redis解析session
  let needSetCookie = false
  let userID = req.cookie.userid
  if (!userID) {
    // 没有userId 需要设置userid
    needSetCookie = true
    userID = `${Date.now()}_${Math.random() * 100}`
    // 初始化 redis 中的 session 值
    handleRedis(userID, {})
  }
  // 获取session
  req.sessionId = userID
  handleRedis(req.sessionId).then(sessionData => {
    if (sessionData === null) {
      // 初始化 redis 中的 session 值
      handleRedis(req.sessionId, {})
      // 设置 session
      req.session = {}
    } else {
      // 设置 session
      req.session = sessionData
    }
    console.log('req.session', req.session);
    // 处理 postData
    return getPostData(req) // 返回promise
  }).then(postData => {
    req.body = postData

    //处理 blog路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userid=${userID}; path=/; HttpOnly; max-age=86400;`
          )
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理 user路由
    const userData = handleUserRouter(req, res)
    if (userData) {
      userData.then(userData => {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userid=${userID}; path=/; HttpOnly; max-age=86400;`
          )
        }
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 未命中路由 返回404
    res.writeHead('404', {
      'content-type': 'text/plain'
    })
    res.write('没找到主人请求的地址哦😯！')
    res.end()
  })
}

module.exports = initServer
