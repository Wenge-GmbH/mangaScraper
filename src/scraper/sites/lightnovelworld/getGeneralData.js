export default async (page) => {
  try {
    const result = await page.evaluate(() => {
      // needs update :,(
      const title = document.querySelector('h1.novel-title').textContent.trim();
      const nextChap = document.querySelector('a#readchapterbtn').href;
      const author = document
        .querySelector('.novel-info .property-item')
        .textContent.trim();
      const hope = Array.from(
        document.querySelectorAll('.novel-info span')
      ).filter((a) => a.textContent.includes('Status'));
      const status = hope[0].children[0].textContent;
      // hope.length > 0 && hope[0].parentElement.lastElementChild.textContent;
      const coverImg = document.querySelector('.cover img').src;
      const summary = document.querySelector('.summary .content').innerText;
      const categories = Array.from(
        document.querySelectorAll('.categories ul li a')
      ).map((el) => el.textContent.trim());
      const tags = Array.from(
        document.querySelectorAll('.tags .content li a')
      ).map((el) => el.textContent.trim());
      return {
        title,
        nextChap,
        author,
        status,
        coverImg,
        summary,
        categories,
        tags,
      };
    });
    return result;
  } catch (e) {
    console.log('catch');
    console.log(e);
  }
};
