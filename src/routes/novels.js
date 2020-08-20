import { LightNovel } from '../models/LightNovel';

// prefix: "/novels"
export default ({ router }) => {
  router.get('/', async (ctx) => {
    try {
      const novels = await LightNovel.find(
        {},
        'title author status coverImg chapterCount slug'
      ); // '-chapters -nextChap -lastChap'
      ctx.body = novels;
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'novels not found');
    }
  });

  router.get('/:slug', async (ctx) => {
    const { slug } = ctx.params;
    try {
      const novel = await LightNovel.findOne({ slug }); // , '-chapters.content'
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
        'chapters.$ title'
      )
        .populate({
          path: 'chapters',
          populate: {
            path: 'content',
            model: 'NovelChapter',
          },
        })
        .lean()
        .exec();

      ctx.body = {
        title: chapter.title,
        content: chapter.chapters[0],
      };
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'chapter not found');
    }
  });
};
