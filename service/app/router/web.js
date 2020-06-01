// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  router.get('/web/index', controller.web.home.index);
  router.get('/web/getArticleList', controller.web.home.getArticleList);
  router.get('/web/getArticleById/:id', controller.web.home.getArticleById);
  router.get('/web/getTypeInfo', controller.web.home.getTypeInfo);
  router.get('/web/getListById/:id', controller.web.home.getListById);
//   router.get('/web/getAllPartCount', controller.web.home.getAllPartCount);
  // router.get('/web/getListBBD',controller.web.home.getListBBD);
};
