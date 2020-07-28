import 'dotenv/config';
import Koa from 'koa';
import scrape from './scraper';
import Router from 'koa-router';

import initMiddleware from './middleware';
import initDB from './db';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello Worl 2d';
  console.log(ctx.db);
});

initDB({ app });
initMiddleware({ app });

app.use(router.routes());
app.use(router.allowedMethods());

const testUrl = 'https://www.lightnovelworld.com/novel/supreme-magus-webnovel';
const scrapingFrom = 'lightnovelworld';
scrape({
  scrapingFrom,
  url: testUrl,
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
