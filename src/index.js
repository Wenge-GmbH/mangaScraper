import 'dotenv/config';
import Koa from 'koa';
import { scrape } from './scraper';
import Router from 'koa-router';

import initMiddleware from './middleware';
import initDB from './db';
import initRoutes from './routes';
import initAgenda from './agenda';
import mongoose from 'mongoose';

const app = new Koa();

(async () => {
  await initDB({ app });
  await initAgenda({ app });
  initMiddleware({ app });
  initRoutes({ app });
})();

// agenda.mongo(mongoose.connection.db, 'agendaJobs');

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
