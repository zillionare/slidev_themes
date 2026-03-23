const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(`http://localhost:3031/11`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  const info = await page.evaluate(() => {
    const isGrid = !!document.querySelector('.grid-layout');
    const wrappers = Array.from(document.querySelectorAll('.grid-area-wrapper'));
    const container = document.querySelector('.grid-container');
    const gridTemplateAreas = container ? window.getComputedStyle(container).gridTemplateAreas : null;
    return {
      isGrid,
      gridTemplateAreas,
      wrapperCount: wrappers.length,
      areas: wrappers.map(w => window.getComputedStyle(w).gridArea),
      content: wrappers.map(w => w.innerText.substring(0, 30).trim().replace(/\n/g, ' ')),
    };
  });
  
  console.log("Grid layout info:", info);
  
  await page.screenshot({ path: 'slide-11-fixed.png' });
  await browser.close();
})();
