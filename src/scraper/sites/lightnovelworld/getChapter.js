export default async (page) => {
  const result = await page.evaluate(() => {
    const title = document
      .querySelector('.titles h2')
      .textContent.replace(/Chapter (([1-9])*):/g, '')
      .trim();
    const nextChap = document.querySelector('.nextchap');
    const content = document
      .querySelector('.chapter-content')
      .innerText.split(`\n`);
    return {
      title,
      content,
      nextChap: nextChap.classList.contains('isDisabled') ? '' : nextChap.href,
    };
  });
  return result;
};
