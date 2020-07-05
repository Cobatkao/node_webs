const { exec } = require("../db/mysql");
const xss = require("xss");

const getList = async (author, keyword) => {
  let sql = `SELECT * FROM blogs WHERE 1=1 `;
  if (author) {
    sql = `${sql} AND author='${author}' `;
  }
  if (keyword) {
    sql = `${sql} AND title LIKE '%${keyword}%' `;
  }
  sql += `ORDER BY createtime DESC`;
  return await exec(sql);
};

const getDetail = async (id) => {
  let sql = `SELECT * FROM blogs WHERE id='${id}'`;
  const rows = await exec(sql);
  return rows[0];
};

const addNewBlog = async (blogData = {}) => {
  let title = xss(blogData.title);
  let content = xss(blogData.content);
  let createtime = Date.now();
  let author = blogData.author;
  let sql = `
    INSERT INTO blogs (title, content, createtime, author) VALUES ('${title}', '${content}', ${createtime}, '${author}')
  `;
  const insertData = await exec(sql);
  return {
    id: insertData.insertId,
  };
};

const updateBlog = async (id = "", blogData = {}) => {
  // blogData是博客对象，包含content，title
  let title = xss(blogData.title);
  let content = xss(blogData.content);
  let sql = `
    UPDATE blogs SET title='${title}', content='${content}' WHERE id=${id};
  `;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) {
    return true;
  }
  return false;
};

const deleteBlog = async (id, author) => {
  // 保证id且为当前用户，防止其他用户修改文章
  let sql = `
    DELETE FROM blogs WHERE id=${id} AND author='${author}';
  `;
  const delData = await exec(sql);
  if (delData.affectedRows > 0) {
    return true;
  }
  return false;
};

module.exports = {
  getList,
  getDetail,
  addNewBlog,
  updateBlog,
  deleteBlog,
};
