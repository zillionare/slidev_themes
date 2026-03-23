const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  for (let i = 8; i <= 13; i++) {
    await page.goto(`http://localhost:3031/${i}`);
    await new Promise(r => setTimeout(r, 500));
    
    const isCards = await page.evaluate(() => {
      return !!document.querySelector('.cards-layout');
    });
    
    if (isCards) {
      console.log(`Found cards layout on page ${i}`);
      
      const info = await page.evaluate(() => {
        const parsedCards = Array.from(document.querySelectorAll('.card-area-wrapper'));
        const html = document.querySelector('.cards-layout').innerHTML;
        const slotHtml = document.querySelector('.cards-layout > div[style="display: none;"]').innerHTML;
        return {
          cardCount: parsedCards.length,
          areas: parsedCards.map(p => p.style.gridArea),
          titles: Array.from(document.querySelectorAll('.card-title')).map(t => t.textContent.trim()),
          slotHtml: slotHtml
        };
      });
      console.log("Card info:", info);
      break;
    }
  }
  
  await browser.close();
})();
