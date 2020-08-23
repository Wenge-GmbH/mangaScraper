import puppeteer from 'puppeteer';
import { downloadImage } from './helper';

import novelSites from './sites';
import { LightNovel, NovelChapter } from '../models/LightNovel';
export const supportedPages = ['lightnovelworld'];

// select page
// selected -> getUrls
// loop and use scrape data gedöns
// use next button till the end
export const scrape = async ({ scrapingFrom, url }) => {
  if (supportedPages.indexOf(scrapingFrom) === -1) return 'Page not supported';
  const scraper = novelSites[scrapingFrom];
  const generalData = await scrapeGeneralData({ url, scraper });
  // console.log(generalData);
  const novel = await LightNovel.findOne({ title: generalData.title });
  if (novel) return console.log('Novel alraedy in Database');

  let newNovel;
  try {
    newNovel = new LightNovel({ ...generalData, scrapingFrom });
    // add page slug
    newNovel.slug = newNovel.title
      .replace(/ /g, '-')
      .replace(/[^a-zA-Z0-9-_]/g, '')
      .toLowerCase();

    // download and save coverImg
    const coverImg = await downloadImage({
      url: generalData.coverImg,
      path: `client/build/images/novels/`,
      filename: newNovel.slug,
    });
    newNovel.coverImg = coverImg;
    // return;
    await newNovel.save();
    console.log(newNovel);
  } catch (e) {
    console.log(e);
  }
  if (!newNovel) return;
  // LightNovel.

  await scrapeChapters({
    firstChapter: generalData.nextChap,
    scraper,
    novel: newNovel,
  });
};

export const scrapeGeneralData = async ({ url, scraper }) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  await scraper.handleCookiePopup(page);
  // getGeneralData returns:
  // title, nextChap, author, status, coverImg, summary, categories, tags
  const generalData = await scraper.getGeneralData(page);
  await browser.close();
  return generalData;
};

export const scrapeChapters = async ({ firstChapter, scraper, novel }) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(firstChapter);
  await scraper.handleCookiePopup(page);
  let count = 0;
  let nextChap = firstChapter;
  console.log('scraping');

  try {
    while (nextChap) {
      await page.goto(nextChap);
      // scrape actual chapter
      const chapter = await scraper.getChapter(page); /// title, content, nextChap
      const chapterNumber = scraper.getChapterNumberFromUrl(nextChap);
      const { title, content } = chapter;

      const chapterContent = new NovelChapter({ content });
      const addThisToChapterArray = {
        title,
        chapter: chapterNumber,
        content: chapterContent,
        number: novel.chapters.length + 1,
      };
      novel.chapters.push(addThisToChapterArray);

      console.log(`${chapterNumber}: ${title}`, nextChap);
      novel.lastChap = nextChap;
      novel.nextChap = chapter.nextChap;

      try {
        await chapterContent.save();
        await novel.save();
        nextChap = chapter.nextChap;
        count++;
        await page.waitFor(5000);
      } catch (e) {
        console.log('error while saving to mongo DB');
        console.log(e);
        nextChap = false;
      }
    }
  } catch (e) {
    console.log(e);
  }
};
