## 中间件

- post 方法的数据在`req.body`中；

- 忽略第一个参数时，无论如何访问都会走下面这个中间件，写在最末尾的中间件可以用来匹配 404；

```
app.use((req, res, next) => {
  xxx
})
```

- 中间件为父路由也会被访问，如当前访问地址为/api/get-cookie，则以下路由也会走

```
app.use('/api'. (req, res, next) => {
  xxx
})
```

- `next()`必须被手动调用后，之后的中间件才会拿到控制权；

## 登录

- 使用 express-session（默认为 connect.sid），connect-redis 实现；

- 主要的方法就是 session(options)，options 包含如下：

  - name: 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid 。
  - store: session 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。express 生态中都有相应模块的支持。
  - secret: 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
  - cookie: 设置存放 session id 的 cookie 的相关选项，默认为 (default: { path: ‘/’, httpOnly: true, secure: false, maxAge: null })
  - genid: 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包。
  - rolling: 每个请求都重新设置一个 cookie，默认为 false。
  - resave: 即使 session 没有被修改，也保存 session 值，默认为 true。

- req.session 保存登录信息（username,realname 等），登录校验做成 express 中间件（loginAuth.js），在需要调用的地方使用；

## redis

1. redis 目录下，运行`redis-server.exe redis.windows.conf`
2. 然后另起一个目录，运行`redis-cli.exe -h 127.0.0.1 -p 6379`，打开可交互界面

项目中运用了将 session 同步存储到 redis 中的操作，存储到 redis 的信息如下：

![image.png](https://i.loli.net/2020/06/28/bt5uwvrWczYl3eN.png)
