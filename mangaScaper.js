const puppeteer = require('puppeteer');
const url =
  'https://readmanhua.net/manga/the-ghostly-doctor/chapter-134/?style=list';

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const imageLinks = await page.evaluate(() => {
    const images = document.querySelectorAll('.page-break  img');
    let links = [];

    for (var i = 0; i < images.length; i++) {
      links.push(images[i].getAttribute('src'));
    }
    return links;
  });
  console.log(imageLinks);

  // await saveImages(imageLinks);
  await browser.close();
};

module.exports = scrape;
const saveImages = async (array) => {
  var i = 0;
  var length = array.length;
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  function checkloop() {
    if (length < i) return;
    i++;
    console.log(i);
    saveFile();
  }
  async function saveFile() {
    // console.log(array[i].split('/').length );
    let fileName = array[i].split('/')[array[i].split('/').length - 1];
    fileName = fileName.replace(/\?.*/, '');
    console.log(fileName);

    let viewSource = await page.goto(array[i]);
    let binaryBuffer = await viewSource.buffer();
    fs.writeFile(`${__dirname}/images/${fileName}`, binaryBuffer, function (err) {
      if (err) {
        return console.log('fs-error', err);
      }
      console.log('The file was saved!');
      checkloop();
    });
  }
  saveFile();
};
