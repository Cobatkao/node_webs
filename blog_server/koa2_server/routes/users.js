const router = require("koa-router")();

const { checkLogin, addNewUser } = require("../controller/userController");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/users");

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

router.get("/session", async (ctx, next) => {
  if (!ctx.session.viewCount) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;
  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount,
  };
});

module.exports = router;
