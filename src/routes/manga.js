import puppeteer from 'puppeteer';
import { Mangadex } from 'mangadex-api';

const user = {
  username: 'DrPanda998',
  password: 'Celly2001',
  remember_me: true,
};
const client = new Mangadex();

const login = async ({ client }) => {
  const loginWithSession = await client.agent.loginWithSession('./session.txt');
  console.log(loginWithSession);
  if (!loginWithSession) {
    const login = await client.agent.login(user.username, user.password, true);
    if (!login) throw 'could not login';
  }
  await client.agent.saveSession('./session.txt');
  console.log('mangadex client ready');
};

export default async ({ router }) => {
  try {
    await login({ client });
  } catch (error) {
    console.log('login error');
    console.log(error);
  }

  router.post('/search', async (ctx) => {
    const { body } = ctx.request;
    console.log(body);

    // const res = await client.search({title: 'tensei', tags: [2]}, {params:{p: 2}, });
    // console.log(client);
    const res = await client.search(body);

    try {
      ctx.body = res;
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'novels not found');
    }
  });

  router.get('/updates', async (ctx) => {
    console.log(client);
    const res = await client.user.getUserFollowedUpdates(2487687);
    ctx.body = res;
  });

  // get manga by id
  router.get('/:id', async (ctx) => {
    const { id } = ctx.params;
    const res = await client.manga.getManga(id);
    ctx.body = res;
  });

  router.get('/:id/chapters', async (ctx) => {
    try {
      const { id } = ctx.params;
      const res = await client.manga.getMangaChapters(id);
      ctx.body = res;
    } catch (error) {
      console.log('error at: /:id/chapters ');
      console.log(error);
      ctx.trow(500, 'sth went wrong');
    }
  });

  router.get('/chapter/:id', async (ctx) => {
    try {
      const { id } = ctx.params;
      const res = await client.chapter.getChapter(id);
      ctx.body = res;
    } catch (error) {
      console.log('error at: /chapter/:id');
      console.log(error);
      ctx.trow(500, 'sth went wrong');
    }
  });
};
