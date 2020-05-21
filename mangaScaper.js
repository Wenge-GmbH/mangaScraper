const puppeteer = require("puppeteer");
const url = "https://proxer.me/manga/mangaseries/clicks/all#top";

const scrape = () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await browser.close();
};

module.exports = scrape;
