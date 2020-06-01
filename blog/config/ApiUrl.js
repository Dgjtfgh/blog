let Url = 'http://127.0.0.1:7001/web/' 

let servicePath = {
    getArticleList:Url + 'getArticleList' ,  //  首页文章列表接口
    getArticleById:Url + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo:Url + 'getTypeInfo',  // 文章类别接口
    getListById:Url + 'getListById/',  // 文章类别接口
}
export default servicePath;