const express = require("express");
const router = express.Router();

const {
  getList,
  getDetail,
  addNewBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 登录验证中间件
const loginAuth = require("../middleware/loginAuth");

//获取博客列表
router.get("/list", (req, res, next) => {
  var author = req.query.author || "";
  const keyword = req.query.keyword || "";

  if (req.query.isadmin) {
    // 管理界面
    if (req.session.username == null) {
      // true => 未登录
      res.json(new ErrorModel("未登录"));
      location.href = "login.html";
      return;
    }
    // 已登录过，强制写死查询自己的博客
    author = req.session.username;
  }

  return getList(author, keyword).then((listData) => {
    //传递promise到app.js
    res.json(new SuccessModel(listData));
  });
});

// 获取博客详情
router.get("/detail", (req, res, next) => {
  return getDetail(req.query.id).then((detailData) => {
    res.json(new SuccessModel(detailData));
  });
});

// 新增博客
router.post("/new", loginAuth, (req, res, next) => {
  req.body.author = req.session.username;
  return addNewBlog(req.body).then((data) => {
    res.json(new SuccessModel(data));
  });
});

// 更新博客
router.post("/update", loginAuth, (req, res, next) => {
  return updateBlog(req.query.id, req.body).then((updateData) => {
    if (updateData) {
      res.json(new SuccessModel("更新博客成功!"));
    }
    res.json(new ErrorModel("更新博客失败!"));
  });
});

// 删除博客
router.post("/del", loginAuth, (req, res, next) => {
  let author = req.session.username;
  return deleteBlog(req.query.id, author).then((delResult) => {
    if (delResult) {
      res.json(new SuccessModel("删除博客成功!"));
    }
    res.json(new ErrorModel("删除博客失败!"));
  });
});

module.exports = router;
