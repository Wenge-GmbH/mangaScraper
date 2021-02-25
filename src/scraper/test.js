// import novelSites from './sites';
// import puppeteer from 'puppeteer';
// const scraper = novelSites['lightnovelworld'];
// import axios from 'axios';
import {Mangadex} from 'mangadex-api';
// import FormData from 'form-data';


(async() => {
  const user = {
    username: 'DrPanda998',
    password: 'Celly2001',
    remember_me: true
  };
  const client = new Mangadex()
  
  // await client.agent.login('username', 'password', false)

  // https://mangadex.org/search?tag_mode_exc=any&tag_mode_inc=all&tags=2&title=tensei
  try {
    // await client.agent.saveSession('./session.txt')
    const test = await client.agent.loginWithSession('./session.txt')
    console.log(client.agent);
    console.log(await client.agent.saveSession('./session.txt'));
    // console.log(client);

    // use {params: {}} for url parameters like p (page)
    const res = await client.search({title: 'tensei', tags: [2]}, {params:{p: 2}, });
    console.log(res.current_page, res.last_page);
  } catch (error) {
    console.log(error);
    // await client.agent.login(user.username, user.password, true)
    // await client.agent.saveSession('./session.txt')

  }

  // now we can use it


})();


