const router = require("koa-router")();

const {
  getList,
  getDetail,
  addNewBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/blog");

// 登录验证中间件
const loginAuth = require("../middleware/loginAuth");

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

module.exports = router;
