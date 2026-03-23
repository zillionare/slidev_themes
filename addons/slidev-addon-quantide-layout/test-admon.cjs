const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://localhost:3032/14`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));

    const info = await page.evaluate(() => {
        const el = document.querySelector('.slidev-layout.thanks');
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return {
            html: el.outerHTML,
            bgImage: style.backgroundImage,
            width: style.width,
            height: style.height
        };
    });

    console.log("Thanks layout:", JSON.stringify(info, null, 2));

    await browser.close();
})();
