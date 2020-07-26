const puppeteer = require('puppeteer');

const supportedPages = ['lightnovelworld'];

import novelSites from './sites';

// select page
// selected -> getUrls
// loop and use scrape data gedöns
// use next button till the end
const scrape = async ({ scrapingFrom, url }) => {
  if (supportedPages.indexOf(scrapingFrom) === -1) return 'Page not supported';
  const scraper = novelSites[scrapingFrom];
  const generalData = await scrapeGeneralData({ url, scraper });
  await scrapeChapters({ firstChapter: generalData.firstChapter, scraper });
};

const scrapeGeneralData = async ({ url, scraper }) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  await scraper.handleCookiePopup(page);
  // getGeneralData returns:
  // title, firstChapter, author, status, coverLink, summary, categories, tags
  const generalData = await scraper.getGeneralData(page);
  await browser.close();
  return generalData;
};

const scrapeChapters = async ({ firstChapter, scraper }) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(firstChapter);
  await scraper.handleCookiePopup(page);

  let count = 0;
  let nextChap = firstChapter;

  try {
    while (count < 2 && nextChap) {
      await page.goto(nextChap);
      // scrape actual chapter
      const chapter = await scraper.getChapter(page); /// title, content, nextChap
      const chapterNumber = scraper.getChapterNumberFromUrl(nextChap);
      const { title, content } = chapter;

      const addThisToChapterArray = {
        title,
        content,
        chapter: chapterNumber,
      };

      const updateLightNovelWithThis = {
        lastChap: nextChap,
        nextChap: chapter.nextChap,
      };
      console.log(`${chapterNumber}: ${title}`, nextChap);

      // on to the next chapter
      nextChap = chapter.nextChap;
      count++;
      await page.waitFor(5000);
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = scrape;
