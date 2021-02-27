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
  router.delete('/:slug', async (ctx) => {
    const { slug } = ctx.params;
    try {
      const novel = await LightNovel.deleteOne({ slug }); // , '-chapters.content'
      ctx.body = novel;
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'novel not found');
    }
  });

  router.get('/:slug/:chapterNum', async (ctx) => {
    const { slug: slugParam, chapterNum } = ctx.params;
    try {
      const { title, slug, chapters, chapterCount } = await LightNovel.findOne(
        {
          slug: slugParam,
          'chapters.number': chapterNum,
        },
        'chapters title slug chapterCount'
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
        title,
        slug,
        chapter: { ...chapters[0], content: chapters[0].content.content },
        chapterCount,
      };
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'chapter not found');
    }
  });
};
