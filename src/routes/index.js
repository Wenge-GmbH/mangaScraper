import Router from 'koa-router';

import novelRoutes from './novels';
import scrapeRoutes from './scrape';
import mangaRoutes from './manga';
import jobsRoutes from './jobs';
import authRoutes from './auth';
import passport from 'koa-passport';


// TODO -> add /api with nested Routes
// https://github.com/koajs/router/blob/HEAD/API.md#nested-routers
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
  // app.use(passport.authenticate('jwt', { session: false }));
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

  // /manga - Router
  const mangaRouter = new Router({ prefix: '/manga' });
  mangaRoutes({ router: mangaRouter });

  app.use(mangaRouter.routes());
  app.use(mangaRouter.allowedMethods());
};
