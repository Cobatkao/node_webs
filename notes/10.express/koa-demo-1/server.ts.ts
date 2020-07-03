import Koa from "koa";

const app = new Koa();

app.use(async (ctx, next) => {
  await next();
  const time = ctx.response.get("X-Response-Time");
  console.log(`${ctx.url} - ${time}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const diff = Date.now() - start;
  ctx.set("X-Response-Time", `${diff} ms`);
});

app.use(async (ctx, next) => {
  ctx.body = "hello world";
  for (let i = 0; i <= 10000; i++) {
    ctx.body += "hello world";
  }
});

// app.use(async (ctx, next) => {
//   ctx.body = "hello";
//   await next();
//   ctx.body += " back";
// });

// app.use(async (ctx, next) => {
//   ctx.body += " world";
//   await next();
// });

// app.use(async (ctx, next) => {
//   ctx.body += " earch";
//   await next();
// });

// app.use(async (ctx) => {
//   ctx.set("Content-Type", "text/html; charset=utf-8");
// });

app.listen(3001, () => {
  console.log("服务器已启动，在3001端口");
});
