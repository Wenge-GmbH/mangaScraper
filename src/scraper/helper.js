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

export const checkCreatePath = async (path) => {
  try {
    await fs.promises.mkdir(path, { recursive: true });
  } catch (e) {
    console.log(e);
  }
};

const imageTypes = [
  { mime: 'image/jpeg', ext: 'jpg' },
  { mime: 'image/png', ext: 'png' },
  { mime: 'image/gif', ext: 'gif' },
  { mime: 'image/webp', ext: 'webp' },
];

// filename == path + filename
export const downloadImage = async ({ url, path, filename }) => {
  const head = await got.head(url);
  // console.log(head.headers['content-type']);
  // console.log(head.headers['content-length']);

  // check content type for file ending (.jpg)
  let type = imageTypes.filter(({ mime }) => mime === head.headers['content-type']);
  if (type.length <= 0) return new Error();

  await checkCreatePath(path);
  const filepath = `${path}${filename}.${type[0].ext}`;
  await pipeline(got.stream.get(url), fs.createWriteStream(filepath));

  return filepath.replace('client/build', '');
};

(async () => {
  // try {
  //   await download(
  //     'https://www.lightnovelworld.com/bookcover/300x400/00384-supreme-magus-webnovel.jpg',
  //     `${__dirname}/../manhua/img.${imageType[0].fileExtension}`
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
  // await test.pipe(fs.createWriteStream(`${__dirname}/../manhua/img.jpg`));
  // fs.writeFile(`${__dirname}/../manhua/img.jpg`, test.body, () => {
  //   console.log('asd');
  // });
})();
