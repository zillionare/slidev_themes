const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(`http://localhost:3031/11`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  const info = await page.evaluate(() => {
    const areas = Array.from(document.querySelectorAll('.grid-area-wrapper'));
    const aArea = areas.find(el => window.getComputedStyle(el).gridArea === 'a');
    const bArea = areas.find(el => window.getComputedStyle(el).gridArea === 'b');
    
    return {
      aFontSize: aArea ? window.getComputedStyle(aArea.querySelector('p')).fontSize : null,
      bFontSize: bArea ? window.getComputedStyle(bArea.querySelector('p')).fontSize : null,
    };
  });
  
  console.log("Style check:", info);
  
  await browser.close();
})();
