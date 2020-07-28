import Router from 'koa-router';

import novelRoutes from './novels';
import scrapeRoutes from './scrape';

export default ({ app }) => {
  const router = new Router();
  router.get('/', (ctx) => {
    ctx.body = 'nth 2 see here';
  });
  app.use(router.routes());
  app.use(router.allowedMethods());

  // /novels - Router
  const novelRouter = new Router({ prefix: '/novels' });
  novelRoutes({ router: novelRouter });

  app.use(novelRouter.routes());
  app.use(novelRouter.allowedMethods());

  // /scrape - Router
  const scrapeRouter = new Router({ prefix: '/scrape' });
  scrapeRoutes({ router: scrapeRouter });

  app.use(scrapeRouter.routes());
  app.use(scrapeRouter.allowedMethods());
};
