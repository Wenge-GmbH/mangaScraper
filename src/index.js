import 'dotenv/config';
import Koa from 'koa';
import { scrape } from './scraper';
import Router from 'koa-router';

import initMiddleware from './middleware';
import initDB from './db';
import initRoutes from './routes';

const app = new Koa();

initDB({ app });
initMiddleware({ app });
initRoutes({ app });

// const testUrl = 'https://www.lightnovelworld.com/novel/supreme-magus-webnovel';
// const scrapingFrom = 'lightnovelworld';
// scrape({
//   scrapingFrom,
//   url: testUrl,
// });

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
