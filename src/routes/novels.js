import mongoose from 'mongoose';
import { LightNovel, NovelChapter } from '../models/LightNovel';

// prefix: "/novels"
export default ({ router }) => {
  router.get('/test', async (ctx) => {
    console.log(ctx.req.user);
    console.log(ctx.isAuthenticated());
    ctx.body = 'test';
  });
  router.get('/', async (ctx) => {
    try {
      const novels = await LightNovel.find(
        {},
        'title author status coverImg chapterCount'
      ); // '-chapters -nextChap -lastChap'
      ctx.body = novels;
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'novels not found');
    }
  });

  router.get('/:id', async (ctx) => {
    const { id } = ctx.params;
    try {
      const novel = await LightNovel.findById(id); // , '-chapters.content'
      ctx.body = novel;
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'novel not found');
    }
  });

  router.get('/:id/:chapterId', async (ctx) => {
    const { id, chapterId } = ctx.params;

    try {
      const chapter = await LightNovel.findOne(
        {
          _id: id,
          'chapters.content': chapterId,
        },
        'chapters.$'
      );
      const content = await NovelChapter.findById(chapterId);
      console.log(content, chapterId);
      ctx.body = { ...chapter._doc.chapters[0], content: content._doc };
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'chapter not found');
    }
  });
};
