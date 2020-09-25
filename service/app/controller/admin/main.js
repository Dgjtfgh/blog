/* eslint-disable no-dupe-class-members */
'use strict';

const Controller = require('egg').Controller;

class MainContoller extends Controller {
  async index() {
    this.ctx.body = 'hi api';
    // const result = await this.app.mysql.select('admin_user');
    // this.ctx.body = {
    //   data: result,
    // };
  }
  // 检验登录
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    console.log(userName, password);
    const sql = " SELECT id FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'";
    const res = await this.app.mysql.query(sql);
    const id = res[0];
    if (res.length > 0) {
      // const openId = new Date().getTime();
      this.ctx.session.id = id;
      this.ctx.body = {
        data: '登录成功',
        id,
      };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
  // 获取类别
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    // console.log(resType);
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    // console.log(tmpArticle);
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }
  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    // console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }
  // 获得文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.view_count as view_count,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC ';
    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }
  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id;
    // console.log(id);
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }
  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  // 获取账户信息
  async getUserInfo() {
    const id = this.ctx.params.id;
    const sql = " SELECT * FROM admin_user WHERE id = '" + id + "'";
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  // 修改账户信息
  async changeUserInfo() {
    const tmpUserInfo = this.ctx.request.body;
    const result = await this.app.mysql.update('admin_user', tmpUserInfo);
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess);
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }
}

module.exports = MainContoller;
