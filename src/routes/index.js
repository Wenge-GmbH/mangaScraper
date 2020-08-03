import Router from 'koa-router';

import novelRoutes from './novels';
import scrapeRoutes from './scrape';
import jobsRoutes from './jobs';
import authRoutes from './auth';
import passport from 'koa-passport';

export default ({ app }) => {
  const router = new Router();
  router.get('/', (ctx) => {
    ctx.body = 'nth 2 see here';
  });

  jobsRoutes({ router });
  authRoutes({ router, app });
  app.use(router.routes());
  app.use(router.allowedMethods());

  // every rote below this is jwt authenticated and will
  // return Unauthenticated if no token was provided or it is wrong
  app.use(passport.authenticate('jwt', { session: false }));
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
