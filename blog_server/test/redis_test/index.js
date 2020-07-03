// node连接redis demo
const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
  console.error(err);
})
// 测试
redisClient.set('myname', 'gaohang', redis.print) // set成功，返回OK
redisClient.get('myname', (err, value) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('value', value) // value gaohang
  // 退出
  redisClient.quit()
})