const { exec } = require("../db/mysql");
const xss = require('xss')

const getList = (author, keyword) => {
  let sql = `SELECT * FROM blogs WHERE 1=1 `;
  if (author) {
    sql = `${sql} AND author='${author}' `;
  }
  if (keyword) {
    sql = `${sql} AND title LIKE '%${keyword}%' `; 
  }
  sql += `ORDER BY createtime DESC`;
  // 返回 promise
  return exec(sql);
}

const getDetail = (id) => {
  let sql = `SELECT * FROM blogs WHERE id='${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  })
}

const addNewBlog = (blogData = {}) => {
  let title = xss(blogData.title);
  let content = xss(blogData.content);
  let createtime = Date.now();
  let author = blogData.author;
  let sql = `
    INSERT INTO blogs (title, content, createtime, author) VALUES ('${title}', '${content}', ${createtime}, '${author}')
  `;
  return exec(sql).then((insertData) => {
    // 返回表里新建博客对应的id
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id = "", blogData = {}) => {
  // blogData是博客对象，包含content，title
  let title = xss(blogData.title);
  let content = xss(blogData.content);
  let sql = `
    UPDATE blogs SET title='${title}', content='${content}' WHERE id=${id};
  `;
  return exec(sql).then((updateData) => {
    // 返回true/false
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

const deleteBlog = (id, author) => {
  // 保证id且为当前用户，防止其他用户修改文章
  let sql = `
    DELETE FROM blogs WHERE id=${id} AND author='${author}';
  `;
  return exec(sql).then((delData) => {
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

module.exports = {
  getList,
  getDetail,
  addNewBlog,
  updateBlog,
  deleteBlog
}