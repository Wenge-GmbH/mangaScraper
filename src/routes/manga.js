import puppeteer from 'puppeteer';
import { Mangadex } from 'mangadex-api';


const user = {
  username: 'DrPanda998',
  password: 'Celly2001',
  remember_me: true
};
const client = new Mangadex()

const login = async ({ client }) => {
  const loginWithSession = await client.agent.loginWithSession('./session.txt');
  if(!loginWithSession) {
    const login = await client.agent.login(user.username, user.password, true)
    if(!login) throw 'could not login';
  }
  await client.agent.saveSession('./session.txt')
  console.log('mangadex client ready');
}

export default async ({ router }) => {
  login({client})

  router.post('/search', async (ctx) => {
    const {body} = ctx.request;
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
}