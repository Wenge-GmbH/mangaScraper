import novelSites from './sites';
import puppeteer from 'puppeteer';
const scraper = novelSites['lightnovelworld'];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const nextChap =
    'https://www.lightnovelworld.com/novel/death-is-the-only-ending-for-the-villain/chapter-1';
  await page.goto(nextChap);

  const chapter = await scraper.getChapter(page);

  console.log(chapter);
})();
