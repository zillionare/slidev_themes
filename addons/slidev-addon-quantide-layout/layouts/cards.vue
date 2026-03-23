<template>
  <div class="slidev-layout cards-layout">
    <!-- Hidden div to capture slot content -->
    <div ref="slotRef" style="display: none;">
      <slot />
    </div>
    <!-- this is title -->
    <div class="title">{{ $frontmatter.title }}</div>
    <!-- gridspec grid mode -->
    <div
      v-if="getGridGroups($frontmatter.gridspec)"
      class="cards-grid"
      :style="{
        marginTop: ($frontmatter.top !== undefined && $frontmatter.top !== null)
          ? (typeof $frontmatter.top === 'number' ? `${$frontmatter.top}px` : String($frontmatter.top))
          : '2.5rem',
        display: 'grid',
        gridTemplateColumns: getGridTemplateColumns($frontmatter.gridspec),
        justifyContent: 'space-evenly'
      }"
    >
      <div class="cards-col" :class="{ 'cards-col-split': col.length > 1 }" v-for="(col, cidx) in getGridGroups($frontmatter.gridspec)" :key="cidx">
        <Card
          v-for="(card, index) in col"
          v-show="shouldShowCard(card.originalIndex, $clicks)"
          :key="index + '-' + cidx"
          :title="card.title"
          :icon="card.icon"
          :img="card.img"
          :orientation="card.orientation || 'landscape'"
          :frame="card.frame || 'rectangle'"
          :backgroundColor="card.backgroundColor"
          :borderColor="card.borderColor"
          :titleColor="card.titleColor"
          :textColor="card.textColor"
          :borderRadius="card.borderRadius"
          :shadow="card.shadow !== false"
          :width="card.width"
          :iconSize="card.iconSize"
          :iconColor="card.iconColor"
        >
          {{ card.content }}
        </Card>
      </div>
    </div>
    <div
      v-else
      class="cards-container"
      :style="{
        marginTop: ($frontmatter.top !== undefined && $frontmatter.top !== null)
          ? (typeof $frontmatter.top === 'number' ? `${$frontmatter.top}px` : String($frontmatter.top))
          : '2.5rem'
      }"
    >
      <Card
        v-for="(card, index) in parsedCards"
        v-show="shouldShowCard(index, $clicks)"
        :key="index"
        :title="card.title"
        :icon="card.icon"
        :img="card.img"
        :orientation="card.orientation || 'landscape'"
        :frame="card.frame || 'rectangle'"
        :backgroundColor="card.backgroundColor"
        :borderColor="card.borderColor"
        :titleColor="card.titleColor"
        :textColor="card.textColor"
        :borderRadius="card.borderRadius"
        :shadow="card.shadow !== false"
        :width="card.width"
        :iconSize="card.iconSize"
        :iconColor="card.iconColor"
      >
        {{ card.content }}
      </Card>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
// Card 组件已通过 slidev-addon-card 全局注册，无需手动导入

// In Slidev, we need to parse the slot content
const slotContent = ref('')
const slotRef = ref(null)
// computed property to determine visible card count based on clicks
const visibleCardCount = computed(() => {
  // If frontmatter has clicks defined, use click-based progressive reveal
  if (typeof $frontmatter.clicks === 'number') {
    // Use Slidev's native reactive $clicks variable
    // clicks=0 shows 1st card, clicks=1 shows 2nd card, etc.
    const visibleCards = Math.max(1, Math.min(parsedCards.value.length, $clicks + 1))
    console.log(`Progressive reveal: clicks=${$clicks}, showing ${visibleCards}/${parsedCards.value.length} cards`)
    return visibleCards
  }
  // Default behavior: show all cards (no progressive reveal)
  return parsedCards.value.length
})

// Parse the slot content to extract card configurations
const parsedCards = computed(() => {
  if (!slotContent.value) {
    return []
  }
  
  const content = slotContent.value
  const cards = []
  
  // Split content by h2 elements or ## headers
  const sections = content.split(/<h2[^>]*>|^## /m).filter(section => section.trim())
  
  sections.forEach((section, index) => {
      // Extract title from h2 tag or plain text
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
      
      if (!title) {
        return
      }
      
      // Parse YAML-like configuration from list items
      const config = { title }
      let content = ''
      
      // Handle both HTML list items and plain text markdown list items
      const listItems = []
      
      // Match HTML list items
      const htmlMatches = configText.match(/<li>([\s\S]*?)<\/li>/g) || []
      htmlMatches.forEach(item => {
        listItems.push(item.replace(/<\/?li>/g, '').trim())
      })
      
      // Match plain text list items (in case slots are unparsed markdown)
      const mdMatches = configText.match(/^[ \t]*-[ \t]+(.*)$/gm) || []
      mdMatches.forEach(item => {
        listItems.push(item.replace(/^[ \t]*-[ \t]+/, '').trim())
      })
      
      // Match paragraph-based configuration (some markdown renderers output p tags)
      const pMatches = configText.match(/<p>([\s\S]*?)<\/p>/g) || []
      pMatches.forEach(item => {
        const text = item.replace(/<\/?p>/g, '').trim()
        if (text.startsWith('- ')) {
          const lines = text.split('\n')
          lines.forEach(line => {
            if (line.trim().startsWith('- ')) {
              listItems.push(line.trim().substring(2).trim())
            }
          })
        }
      })
      
      listItems.forEach(item => {
        const match = item.match(/^([\w]+):\s*([\s\S]+)$/)
        if (match) {
          const [, key, value] = match
          if (key === 'content') {
            content = value.trim()
          } else {
            // Remove quotes if present
            config[key] = value.trim().replace(/^['"](.*)['"]$/, '$1')
          }
        }
      })
      
      if (content) {
        config.content = content
      }
      
      cards.push(config)
    })
  
  return cards
})

// Extract content from the default slot
onMounted(() => {
  if (slotRef.value) {
    slotContent.value = slotRef.value.innerHTML || slotRef.value.textContent || ''
  }
})

// Helper function to determine if a card should be shown
function shouldShowCard(cardIndex, click) {
  // If no clicks control (frontmatter.clicks not defined), show all cards
  if (typeof $frontmatter.clicks !== 'number') {
    return true
  }
  
  // For click-based progressive reveal
  if (click === undefined || click === 'undefined') {
    return cardIndex === 0
  }

  return cardIndex <= click
}

// Group cards by gridspec pattern like "ADBCC"
// Each character position corresponds to a card, same characters go to same column
function getGridGroups(spec) {
  if (!spec || !Array.isArray(parsedCards.value) || parsedCards.value.length === 0) return null
  const raw = String(spec).replace(/\s+/g, '')
  if (!raw) return null
  const chars = raw.split('')
  if (chars.length !== parsedCards.value.length) return null
  
  // Map each position to its column based on unique characters
  const uniqueChars = [...new Set(chars)]
  const columns = uniqueChars.map(() => [])
  
  chars.forEach((ch, idx) => {
    const key = String(ch).toUpperCase()
    const columnIndex = uniqueChars.findIndex(c => c.toUpperCase() === key)
    // Preserve original index for reveal ordering
    const cardWithIndex = { ...parsedCards.value[idx], originalIndex: idx }
    columns[columnIndex].push(cardWithIndex)
  })
  
  return columns
}

function getGridTemplateColumns(spec) {
  const groups = getGridGroups(spec)
  if (!groups) return 'repeat(1, minmax(0, 1fr))'
  // Weight columns with more cards slightly wider (e.g., 1.5fr), others 1fr
  // Show like N standalone columns, spaced evenly regardless of widths
  return `repeat(${groups.length}, max-content)`
}




</script>

<style scoped>
.title {
    position: fixed;
    top: 2px;
    height: 2.2rem;
    text-align: left;
    left: 0;
    background-color: var(--primary);
    padding: 0.3rem 1.5rem 0.3rem 1.5rem;
    border-radius: 0 2rem 0 2rem;
}
.slidev-layout.cards-layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  margin: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
}

.cards-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  margin-top: 0;
}

.cards-grid {
  width: 100%;
  box-sizing: border-box;
  column-gap: 1.5rem;
  row-gap: 1.5rem;
  align-items: stretch;
}

.cards-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  height: 100%;
}

.cards-col-split {
  justify-content: flex-start;
  padding: 0;
}



.cards-container .card {
  flex: 0 0 auto;
  margin: 0;
  border: 1px solid;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.cards-container .card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
}

/* Keep cards in single row for all screen sizes */
@media (min-width: 768px) {
  .cards-container {
    gap: 1.5rem;
  }
}

@media (min-width: 1200px) {
  .cards-container {
    gap: 2rem;
  }
}

/* Card component styles */
.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.card-image img {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.card-icon {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-icon i {
  display: block;
}

.card-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}

.card-content {
  text-align: center;
  line-height: 1.6;
}
</style>
