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
  browser.close();
  return generalData;
};

const scrapeChapters = async (firstChapter) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(firstChapter);

  await handleCookiePopup(page);
};

const getGeneralData = async (page) => {
  const result = await page.evaluate(() => {
    const title = document.querySelector('h1.novel-title').textContent.trim();
    const firstChapter = document.querySelector('a#readchapterbtn').href;
    const author = document
      .querySelector('.novel-info .property-item')
      .textContent.trim();

    const hope = [...document.querySelectorAll('.novel-info span')].filter((a) =>
      a.textContent.includes('Status : ')
    );
    const status =
      hope.length > 0 && hope[0].parentElement.lastElementChild.textContent;

    const coverLink = document.querySelector('.cover img').src;
    const summary = document.querySelector('.summary .content p').textContent;

    const categories = [
      ...document.querySelectorAll('.categories .content li a'),
    ].map((el) => el.textContent.trim());

    const tags = [...document.querySelectorAll('.tags .content li a')].map((el) =>
      el.textContent.trim()
    );

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
