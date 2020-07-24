const puppeteer = require('puppeteer');

const supportedPages = ['lightnovelworld'];

const testUrl = 'https://www.lightnovelworld.com/novel/supreme-magus-webnovel';

// select page
// selected -> getUrls
// loop and use scrape data gedöns
// use next button till the end
const scrape = async () => {
  const generalData = await scrapeGeneralData(testUrl);
  await scrapeChapters(generalData.firstChapter);
};

const scrapeGeneralData = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  await handleCookiePopup(page);
  const generalData = await getGeneralData(page);
  console.log('hi');
  await browser.close();
  return generalData;
};

const scrapeChapters = async (firstChapter) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(firstChapter);
  await handleCookiePopup(page);

  let count = 0;
  let nextChap = firstChapter;

  try {
    while (count < 30 && nextChap) {
      await page.goto(nextChap);
      const chapter = await getChapter(page);
      console.log(chapter.title);
      nextChap = chapter.nextChap;
      count++;
      await page.waitFor(5000);
    }
  } catch (e) {
    console.log(e);
  }
};

const getChapter = async (page) => {
  const result = page.evaluate(() => {
    const title = document.querySelector('.titles h2').textContent.trim();
    const nextChap = document.querySelector('.nextchap');
    const content = document
      .querySelector('.chapter-content')
      .innerHTML.split(`<br>`);
    return {
      title,
      content,
      nextChap: nextChap.classList.contains('isDisabled') ? false : nextChap.href,
    };
  });
  return result;
};

const getGeneralData = async (page) => {
  try {
    const result = await page.evaluate(() => {
      const title = document.querySelector('h1.novel-title').textContent.trim();
      const firstChapter = document.querySelector('a#readchapterbtn').href;
      const author = document
        .querySelector('.novel-info .property-item')
        .textContent.trim();
      const hope = Array.from(
        document.querySelectorAll('.novel-info span')
      ).filter((a) => a.textContent.includes('Status : '));
      const status =
        hope.length > 0 && hope[0].parentElement.lastElementChild.textContent;
      const coverLink = document.querySelector('.cover img').src;
      const summary = document.querySelector('.summary .content p').textContent;
      const categories = Array.from(
        document.querySelectorAll('.categories .content li a')
      ).map((el) => el.textContent.trim());
      const tags = Array.from(
        document.querySelectorAll('.tags .content li a')
      ).map((el) => el.textContent.trim());
      return {
        title,
        firstChapter,
        author,
        status,
        coverLink,
        summary,
        categories,
        tags,
      };
    });
    console.log(result);
    return result;
  } catch (e) {
    console.log('catch');
    console.log(e);
  }
};

const handleCookiePopup = async (page) => {
  const btnClass = '.cmpboxbtn';
  try {
    await page.click(btnClass);
  } catch (e) {
    console.log('cookie notice error');
    console.log(e);
  }
};
module.exports = scrape;
