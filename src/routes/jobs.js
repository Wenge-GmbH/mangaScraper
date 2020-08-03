import passport from 'koa-passport';
// prefix: "/"
export default ({ router }) => {
  router.get('/jobs', async (ctx) => {
    try {
      const jobs = await ctx.agenda.jobs();
      ctx.body = jobs;
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'jobs not found');
    }
  });
  router.get('/jobs/test', async (ctx) => {
    const job = ctx.agenda.now('test', { msg: 'test' });
    // await job.save();
    ctx.body = 'agenda created';
  });
};
