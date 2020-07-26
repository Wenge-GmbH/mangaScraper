export default async (page) => {
  const result = await page.evaluate(() => {
    const title = document.querySelector('.titles h2').textContent.trim();
    const nextChap = document.querySelector('.nextchap');
    const content = document
      .querySelector('.chapter-content')
      .innerHTML.split(`<br>`);
    return {
      title,
      content,
      nextChap: nextChap.classList.contains('isDisabled') ? '' : nextChap.href,
    };
  });
  return result;
};
