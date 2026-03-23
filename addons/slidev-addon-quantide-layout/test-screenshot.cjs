const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`http://localhost:3031/11`, { waitUntil: 'domcontentloaded' });
  
  // Wait a bit for Vue to render
  await new Promise(r => setTimeout(r, 2000));
  
  const info = await page.evaluate(() => {
    const wrappers = Array.from(document.querySelectorAll('.card-area-wrapper'));
    return {
      wrapperCount: wrappers.length,
      areas: wrappers.map(w => w.style.gridArea),
      cardTitles: Array.from(document.querySelectorAll('.card-title')).map(t => t.textContent.trim()),
      displayStyles: wrappers.map(w => window.getComputedStyle(w).display)
    };
  });
  
  console.log("Extracted info:", JSON.stringify(info, null, 2));
  
  const html = await page.content();
  fs.writeFileSync('slide-11.html', html);
  await page.screenshot({ path: 'slide-11.png' });
  
  await browser.close();
})();
