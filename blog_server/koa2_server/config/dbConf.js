const env = process.env.NODE_ENV; // 环境参数

//  数据库配置
let MYSQL_CONF;
let REDIS_CONF;

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "hhgh2280784",
    port: 3306,
    database: "blog",
  };
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}

if (env === "production") {
  // 本地环境模拟
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "hhgh2280784",
    port: 3306,
    database: "blog",
  };
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
};
