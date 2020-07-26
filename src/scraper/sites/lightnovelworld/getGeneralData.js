export default async (page) => {
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
