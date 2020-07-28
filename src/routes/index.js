import Router from 'koa-router';

import novelRoutes from './novels';

export default ({ app }) => {
  const router = new Router();
  router.get('/', (ctx) => {
    ctx.body = 'nth 2 see here';
  });
  app.use(router.routes());
  app.use(router.allowedMethods());

  const novelRouter = new Router({ prefix: '/novels' });
  novelRoutes({ router: novelRouter });

  app.use(novelRouter.routes());
  app.use(novelRouter.allowedMethods());
};
