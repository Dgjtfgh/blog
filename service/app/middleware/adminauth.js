/* eslint-disable strict */
// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async function adminauth(ctx, next) {
    // console.log(ctx.session.openId);
    if (ctx.session.openId) {
      // console.log('已经登录了');
      await next();
    } else {
      // console.log('没有登录');
      ctx.body = { data: '没有登录' };
    }
  };
};
