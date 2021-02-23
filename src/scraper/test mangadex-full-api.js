// import novelSites from './sites';
// import puppeteer from 'puppeteer';
// const scraper = novelSites['lightnovelworld'];
// import axios from 'axios';
// import {Mangadex} from 'mangadex-api';
// import FormData from 'form-data';
import api from 'mangadex-full-api';


(async() => {
  const user = {
    username: 'DrPanda998',
    password: 'Celly2001',
    remember_me: true
  };
  
  // try {
    const loginRes = await api.agent.cacheLogin('./cache.txt', user.username, user.password, user.remember_me)
    console.log(loginRes);

    const manga = await api.Manga.search('tensei');
    // const userm = await api.agent.fillUser();
    // console.log('user');
    // console.log(userm);

    // const test = await manga.search('tensei');
  console.log('manga');
  console.log(manga);

  // } catch (error) {
  //   console.log(error);
  // }
  

})();


