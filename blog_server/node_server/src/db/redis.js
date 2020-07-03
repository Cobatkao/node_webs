const redis = require('redis')
const { REDIS_CONF } = require('../config/dbConf')

const redisClient = redis.createClient({
  port: REDIS_CONF.port,
  host: REDIS_CONF.host
})
redisClient.on('error', err => {
  console.error(err)
})

// 封装redis存取操作
function handleRedis(key, value) {
  // get
  if (arguments.length === 1) {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, val) => {
        if (err) {
          reject(err)
          return
        }
        if (val == null) { // 传入的key没有对应的value
          resolve(null)
          return
        }
        try {
          // 此处try...catch是为了兼容JSON格式转换
          resolve(JSON.parse(val)) // 字符串序列化为对象
        } catch (err) {
          // 若不是JSON格式，则直接返回
          resolve(val)
        }
      })
    })
  } else if (arguments.length === 2) {
    // set
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
  }
}

module.exports = {
  handleRedis
}
