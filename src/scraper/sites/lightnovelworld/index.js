import getGeneralData from './getGeneralData';
import getChapter from './getChapter';

export default {
  getChapterNumberFromUrl: (url) => {
    return url.slice(url.lastIndexOf('chapter-') + 'chapter-'.length, url.length);
  },
  handleCookiePopup: async (page) => {
    const btnClass = '.cmpboxbtn';
    try {
      await page.click(btnClass);
    } catch (e) {
      console.log('cookie notice error');
      // console.log(e);
    }
  },
  getNextChapterURL: async (page) => {
    const result = await page.evalutate(() => {
      const nextChap = document.querySelector('.nextchap');
      return nextChap.classList.contains('isDisabled') ? '' : nextChap.href;
    });

    return result;
  },

  getGeneralData,
  getChapter,
};
