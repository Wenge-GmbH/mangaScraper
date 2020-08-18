import stream from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import got from 'got';

const pipeline = promisify(stream.pipeline);

export function downloadStuff(images, i) {
  if (images.length <= 0) return;
  download(images[0], `${__dirname}/manhua/img${i}.jpg`, function () {
    console.log('done');
    images.shift();
    i++;
    downloadStuff(images, i);
  });
}

// filename == path + filename
export const download = async (uri, filename) => {
  const res = await pipeline(got.stream.get(uri), fs.createWriteStream(filename));
};

const imageTypes = [
  { mime: 'image/jpeg', fileExtension: 'jpg' },
  { mime: 'image/png', fileExtension: 'png' },
  { mime: 'image/gif', fileExtension: 'gif' },
  { mime: 'image/webp', fileExtension: 'webp' },
];
(async () => {
  try {
    const test = await got.head(
      'https://www.lightnovelworld.com/bookcover/300x400/00384-supreme-magus-webnovel.jpg'
    );
    console.log(test.headers['content-type']);
    console.log(test.headers['content-length']);

    let imageType = imageTypes.filter(
      ({ mime }) => mime === test.headers['content-type']
    );
    if (imageType.length <= 0) return;

    await download(
      'https://www.lightnovelworld.com/bookcover/300x400/00384-supreme-magus-webnovel.jpg',
      `${__dirname}/../manhua/img.${imageType[0].fileExtension}`
    );
  } catch (e) {
    console.log(e);
  }

  // await test.pipe(fs.createWriteStream(`${__dirname}/../manhua/img.jpg`));
  // fs.writeFile(`${__dirname}/../manhua/img.jpg`, test.body, () => {
  //   console.log('asd');
  // });
})();
