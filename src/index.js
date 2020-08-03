import 'dotenv/config';
import Koa from 'koa';
import { scrape } from './scraper';

import initMiddleware from './middleware';
import initDB from './db';
import initRoutes from './routes';
import { initAgenda } from './agenda';
import initTestAgenda from './jobs/test';
import initAuth from './middleware/auth';

const app = new Koa();
(async () => {
  await initDB({ app });
  await initAgenda({ app });
  initMiddleware({ app });

  initAuth({ app });

  initRoutes({ app });

  initTestAgenda();

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });

  // gracefully shut down
  process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');

    await app.context.agenda.stop();
    console.info('agenda gracefully stooped.');
    await app.context.db.close(false);
    console.info('MOngoDb connection closed.');
    process.exit(0);
  });
})();
