let Url = 'http://127.0.0.1:7001/admin/' 

let servicePath = {
    checkLogin:Url + 'checkLogin' ,  // 检查用户名密码
    getTypeInfo:Url + 'getTypeInfo' ,  // 获得文章类别信息
    addArticle:Url + 'addArticle' ,  // 添加文章
    updateArticle:Url + 'updateArticle' ,  // 修改文章
    getArticleList:Url + 'getArticleList' ,  // 获得文章列表
    delArticle:Url + 'delArticle/' ,  // 删除文章
    getArticleById:Url + 'getArticleById/' ,  // 根据文章ID得到文章详情，用于修改文章
}
export default servicePath;