import mongoose from 'mongoose';
import { LightNovel } from '../models/LightNovel';
import { supportedPages, scrape } from '../scraper';

// prefix: "/scrape"
export default ({ router }) => {
  router.get('/', async (ctx) => {
    ctx.body = {
      novel: {
        supportedPages,
      },
      manga: {
        supportedPages: [],
      },
    };
  });

  router.get('/novels', async (ctx) => {
    ctx.body = supportedPages;
  });

  router.post('/novels', async (ctx) => {
    const { site, url } = ctx.request.body;
    ctx.body = { site, url };

    scrape({ scrapingFrom: site, url }).then((e) => {
      // console.log(e);
    });
  });
};
