const mysql = require("mysql");

// 创建连接对象
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port: 3306,
  database: "myblog" // equal to use myblog;
});

// 开始连接
con.connect();

// 执行 sql
const sql = "insert into blogs (title, content, createtime, author) values ('标题D', '内容D', 1560848832322, '欢猪');";
con.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
});

// 关闭连接
con.end();
