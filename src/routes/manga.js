import puppeteer from 'puppeteer';

const bodyToUrlParams = (body) => {
  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      const element = body[key];

    }
  }
}

const login = async ({ page }) => {
  await page.focus('#login_username');
  await page.keyboard.type('DrPanda998');
  await page.focus('#login_password');
  await page.keyboard.type('Celly2001');

  await page.click('#remember_me');
  await page.click('#login_button');

  // await page.goto('https://mangadex.org/search');
}


export default ({ router }) => {
  router.post('/search', async (ctx) => {
    const { body } = ctx.request;
    console.log(body);

    const browser = await puppeteer.launch({ headless: false, userDataDir: '../user_data', args: ['--no-sandbox', '--disable-setuid-sandbox', '--user-data-dir'] });
    const page = await browser.newPage();
    await page.goto('https://mangadex.org/search');
    await login({ page });
    await page.waitForTimeout(500)

    const cookies = await page.cookies();
    console.log(cookies);

    await page.setCookie(...cookies)
    await page.goto('https://mangadex.org/search')

    // https://stackoverflow.com/questions/48608971/how-to-manage-log-in-session-through-headless-chrome

    try {
      ctx.body = 'asd'
    } catch (e) {
      console.log(e);
      ctx.throw(404, 'novels not found');
    }
  });
}