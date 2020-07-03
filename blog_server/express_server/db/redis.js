const redis = require("redis");
const { REDIS_CONF } = require("../config/dbConf");

// 创建redis客户端
const redisClient = redis.createClient({
  port: REDIS_CONF.port,
  host: REDIS_CONF.host,
});

redisClient.on("ready", (res) => {
  console.log("redis ready", res);
});

redisClient.on("connect", () => {
  console.log("redis connect success!");
});

redisClient.on("error", (err) => {
  console.error(err);
});

module.exports = redisClient;
