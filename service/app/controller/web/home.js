/* eslint-disable indent */
'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {
    async index() {
        // 首页的文章列表数据
        this.ctx.body = 'hi api';
    }

    // eslint-disable-next-line no-dupe-class-members
    async all() {
        // 首页的文章列表数据
        const sql = 'SELECT * FROM article';
        const result = await this.app.mysql.query(sql);
        this.ctx.body = {
            data: result,
        };
    }

    // 首页文章列表接口
    async getArticleList() {
        const sql = 'SELECT article.id as id ,' +
            'article.title as title ,' +
            'article.introduce as introduce ,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id';
        // console.log(sql);
        const results = await this.app.mysql.query(sql);
        this.ctx.body = {
            data: results,
        };
    }
    // 得到详细页文章接口
    async getArticleById() {
        // 先配置路由的动态传值，然后再接收值
        const id = this.ctx.params.id;
        const sql = 'SELECT article.id as id ,' +
            'article.title as title ,' +
            'article.introduce as introduce ,' +
            'article.article_content as article_content ,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id;

        const result = await this.app.mysql.query(sql);

        this.ctx.body = { data: result };
    }
    // 得到类别名称和编号
    async getTypeInfo() {
        const result = await this.app.mysql.select('type');
        this.ctx.body = { data: result };
    }

    // 根据类别ID获得文章列表
    async getListById() {
        const id = parseInt(this.ctx.params.id);
        if (id) {
            const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE type_id=' + id;
            const result = await this.app.mysql.query(sql);
            this.ctx.body = { data: result };
        } else {
            this.ctx.body = { data: '错误的Id' };
        }
    }

    // // 获取总集数和总浏览数
    // async getAllPartCount() {

    //     const sql = 'SELECT SUM(part_count) as all_part_count ,' +
    //         'SUM(view_count) as all_view_count ' +
    //         'FROM article';

    //     const result = await this.app.mysql.query(sql);
    //     this.ctx.body = { data: result };
    // }
}

module.exports = HomeController;
