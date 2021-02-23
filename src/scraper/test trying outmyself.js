// import novelSites from './sites';
// import puppeteer from 'puppeteer';
// const scraper = novelSites['lightnovelworld'];
import axios from 'axios';
// import {Mangadex} from 'mangadex-api';
// import FormData from 'form-data';

const multipart = {
  boundary: () =>
  'mfa' + Math.floor(Math.random() * 1000).toString(),
  payload: (boundary = 'mfa21', obj = {}) => {
    let payload = ''
    for (const i in obj) {
      payload += `--${boundary}\nContent-Disposition: form-data; name="${i}"\n\n${obj[i]}\n`
    }
    payload += `--${boundary}--`
    return payload
  }

};
  
  

const currentSession = {
  sessionId: 'cb78d9f8-6765-4374-8178-0653ece6d496',
  sessionExpiration: 'Mon, 22-Feb-2021 22:42:33 GMT',
  persistentId: 'd2e716b5bc171456a1e40b9a8722fe8b8ef1bc28c77ce8448b0642c856f3ed3e'
}

(async () => {

  const payload = {
    login_username: 'DrPanda998',
    login_password: 'Celly2001',
    remember_me: 1
  }
  const boundary = multipart.boundary()
  const formData = multipart.payload(boundary,payload)

  const {headers, data} = await axios.post(`https://mangadex.org/ajax/actions.ajax.php?function=login`,formData, {
    headers: {
      'User-Agent': 'mangadex-api/test',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': `multipart/form-data boundary=${boundary}`
    }
  })
  console.log(headers);
  console.log(data);

  const session = {};

  const mangadexSession = headers['set-cookie'].find((cookie) =>
      cookie.includes('mangadex_session')
    )
    if (mangadexSession) {
      const sessionId = mangadexSession.match(/mangadex_session=(\S+);/i)[1]
      session.sessionId = sessionId
      const expiration = mangadexSession.match(/expires=([\S\s]+?);/i)[1]
      session.sessionExpiration = expiration
    }

    const persistent = headers['set-cookie'].find((cookie) =>
      cookie.includes('mangadex_rememberme_token')
    )
    if (persistent) {
      const persistentId = persistent.match(
        /mangadex_rememberme_token=(\S+);/i
      )[1]
      session.persistentId = persistentId
    }

    console.log('------------------');

  console.log(session);
  // try {
  //   const client = new Mangadex();

  //   await client.agent.login('DrPanda998', 'Celly2001', true)
  //   // const res = await client.agent.loginWithSession('./session')
  //   // console.log(res);
  //   await client.agent.saveSession('./session');
  
  
  //   const me = await client.search('tensei');
  //   console.log(me);
  
  // } catch (error) {
  //   console.log(error);
  // }



  // const browser = await puppeteer.launch({ headless: true });
  // const page = await browser.newPage();
  // const nextChap =
  //   'https://www.lightnovelworld.com/novel/death-is-the-only-ending-for-the-villain/chapter-1';
  // await page.goto(nextChap);



  // console.log(res);

  // const chapter = await scraper.getChapter(page);
  // const res = await axios.get('https://mangadex.org/search', {headers: {cookie: 'mangadex_rememberme_token=638763b9b23b5b0625499b6792ff26b3adefcf01ec1fdd2fd20f7767aae2d32a; mangadex_session=f367bd82-4cd7-46d0-a6f3-cd985ccb0aae'}})
  // console.log(res.data.search('Activation'));


})();


