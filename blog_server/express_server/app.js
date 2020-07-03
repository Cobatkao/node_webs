const createError = require("http-errors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
  app.use(logger("dev"));
} else {
  const logFileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFileName, {
    flags: "a",
  });
  app.use(
    logger("combined", {
      stream: writeStream,
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/views")));

const RedisClient = require("./db/redis");
const sessionStore = new RedisStore({
  client: RedisClient,
});

/*
 * session中间件，在路由前调用
 */
app.use(
  session({
    secret: "SkJad_12871#",
    cookie: {
      // 设置存放 session id 的 cookie 的相关选项，
      path: "/", // default
      httpOnly: true, // default
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore, // 指定session的存储方式 将session存入redis
  })
);

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
