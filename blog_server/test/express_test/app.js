const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url);
  next()
})

app.use((req, res, next) => {
  req.cookie = {
    userid: 'abcd1234'
  }
  next()
})

app.use((req, res, next) => {
  setTimeout(() => {
    req.body = {
      username: 'gaohang',
      password: 'gaohang2280784'
    }
    next()
  });
  
})

app.use('/api', (req, res, next) => {
  console.log('app.use 处理 /api路由');
  next()
})

app.get('/api', (req, res, next) => {
  console.log('正在处理 GET /api路由');
  next()
})

app.post('/api', (req, res, next) => {
  console.log('正在处理 POST /api路由');
  next()
})

function loginCheck(req, res, next) {
  console.log('模拟登录成功！');
  next()
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('处理 GET get-cookie');
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.post('/api/get-postData', loginCheck, (req, res, next) => {
  console.log('处理 POST get-postData');
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('处理 404');
  res.json({
    errno: -1,
    msg: '404 NOT FOUND'
  })
})

app.listen(9000, () => {
  console.log('server is running on port 9000');
})