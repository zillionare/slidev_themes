const fs = require('fs');

const content = `<h2 id="核心特性" tabindex="-1"><a class="header-anchor" href="#核心特性" aria-hidden="true">#</a> 核心特性</h2>
<ul>
<li>icon: i-carbon-idea</li>
<li>content: 自动解析 Markdown 列表，将每个带有二级标题 <code>##</code> 的部分转换为精美的卡片。</li>
<li>backgroundColor: '#f0f8ff'</li>
</ul>
<h2 id="样式定制" tabindex="-1"><a class="header-anchor" href="#样式定制" aria-hidden="true">#</a> 样式定制</h2>
<ul>
<li>icon: i-carbon-color-palette</li>
<li>content: 支持自定义图标、背景色、边框色等。底层由 slidev-addon-card 强力驱动，支持更多高阶用法。</li>
<li>borderColor: '#007acc'</li>
</ul>
<h2 id="网格系统" tabindex="-1"><a class="header-anchor" href="#网格系统" aria-hidden="true">#</a> 网格系统</h2>
<ul>
<li>icon: i-carbon-grid</li>
<li>content: 支持 gridspec 参数进行高级网格划分。例如当前页面的 2D 布局，能够像写 ASCII 艺术一样定义复杂的自适应网格。</li>
</ul>
<h2 id="响应式支持" tabindex="-1"><a class="header-anchor" href="#响应式支持" aria-hidden="true">#</a> 响应式支持</h2>
<ul>
<li>icon: i-carbon-scale</li>
<li>content: 卡片在 2D gridspec 模式下能够自动充满其所在的网格区域，自适应调整大小。</li>
<li>backgroundColor: '#fff0f5'</li>
</ul>`;

const sections = content.split(/<h2[^>]*>|^## /m).filter(section => section.trim())
console.log("sections length:", sections.length);
sections.forEach((section, index) => {
    let title = ''
    let configText = section
    
    // Handle h2 tag content
    const h2Match = section.match(/^([^<]+)<\/h2>/)
    if (h2Match) {
      title = h2Match[1].trim()
      configText = section.replace(/^[^<]+<\/h2>/, '')
    } else {
      // Handle plain text title
      const lines = section.split('\n')
      title = lines[0].trim()
      configText = lines.slice(1).join('\n')
    }
    console.log(`[${index}] Title: ${title}`);
});
