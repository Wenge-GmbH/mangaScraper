const puppeteer = require("puppeteer");
const fs = require('fs')
const request = require('request');

const url =
  "https://readmanhua.net/manga/the-ghostly-doctor/chapter-181/?style=list";

const scrape = async () => {
  try {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.evaluate(() => {
      const img = document.querySelectorAll('.page-break img');
      const linksArray = [];
      for (let i = 0; i < img.length; i++) {
        linksArray.push(img[i].src);
      }
      return linksArray;
    })
    console.log(result);
    
    await page.waitFor(10000);
    downloadStuff(result, 1)
    await browser.close();
  }
  catch (e) {
    console.log()
  }
};

function downloadStuff(images, i) {
  console.log(i);
  
  if(images.length <= 0) return;
  download(images[0], `${__dirname}/manhua/img${i}.jpg`, function(){
    console.log('done');
    images.shift();
    i++;
    downloadStuff(images, i)
  })
}



var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//   console.log('done');
// });

// const saveImages = async (array) => {
//   var i = 0;
//   var length = array.length;
//   const browser = await puppeteer.launch({
//     headless: true,
//   });
//   const page = await browser.newPage();

//   function checkloop() {
//     if (length < i) return;
//     i++;
//     console.log(i);
//     saveFile();
//   }
//   async function saveFile() {
//     // console.log(array[i].split('/').length );
//     let fileName = array[i].split('/')[array[i].split('/').length - 1];
//     fileName = fileName.replace(/\?.*/, '');
//     console.log(fileName);

//     let viewSource = await page.goto(array[i]);
//     let binaryBuffer = await viewSource.buffer();
//     fs.writeFile(`${__dirname}/images/${fileName}`, binaryBuffer, function (err) {
//       if (err) {
//         return console.log('fs-error', err);
//       }
//       console.log('The file was saved!');
//       checkloop();
//     });
//   }
//   saveFile();
// };

module.exports = scrape;
