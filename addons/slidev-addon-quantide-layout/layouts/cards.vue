<template>
  <div class="slidev-layout cards-layout">
    <!-- Hidden div to capture slot content -->
    <div ref="slotRef" style="display: none;">
      <slot />
    </div>
    <!-- this is title -->
    <div class="title">{{ $frontmatter.title }}</div>
    <!-- gridspec grid mode using grid-template-areas -->
    <div
      v-if="$frontmatter.gridspec && parsedCards.length > 0 && isValidGridspec($frontmatter.gridspec, parsedCards.length)"
      class="cards-grid-areas"
      :style="{
        marginTop: ($frontmatter.top !== undefined && $frontmatter.top !== null)
          ? (typeof $frontmatter.top === 'number' ? `${$frontmatter.top}px` : String($frontmatter.top))
          : '2.5rem',
        display: 'grid',
        gridTemplateAreas: getGridTemplateAreas($frontmatter.gridspec),
        gridTemplateColumns: getGridColumnsForAreas($frontmatter.gridspec),
        gridTemplateRows: getGridRowsForAreas($frontmatter.gridspec),
        gap: '20px',
        height: '100%',
        flex: 1
      }"
    >
      <div 
        v-for="(card, index) in getCardsWithAreas($frontmatter.gridspec, parsedCards)" 
        :key="index"
        :style="{ gridArea: card.gridArea }"
        class="card-area-wrapper"
      >
        <Card
          v-show="shouldShowCard(card.originalIndex, $clicks)"
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
          :width="card.width || '100%'"
          :height="card.height || '100%'"
          :iconSize="card.iconSize"
          :iconColor="card.iconColor"
          style="height: 100%;"
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
import Card from 'slidev-addon-card/components/Card.vue'

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

// Helper functions for grid-template-areas implementation
function getGridAreasInfo(spec) {
  if (!spec) return null
  const rows = String(spec).trim().split('\n').map(r => r.trim()).filter(r => r.length > 0)
  if (rows.length === 0) return null
  
  const raw = String(spec).replace(/\s+/g, '')
  if (!raw) return null
  
  // Extract unique identifiers in the order they appear
  const uniqueChars = [...new Set(raw.split('').map(c => c.toUpperCase()))]
  
  return { rows, uniqueChars, colCount: rows[0].length, rowCount: rows.length }
}

function isValidGridspec(spec, cardsLength) {
  const info = getGridAreasInfo(spec)
  if (!info) return false
  
  // Check if all rows have the same length
  const allRowsSameLength = info.rows.every(r => r.length === info.colCount)
  if (!allRowsSameLength) return false
  
  // Must have exactly as many unique chars as cards, or fewer (we ignore extra cards)
  return info.uniqueChars.length === cardsLength
}

function getGridTemplateAreas(spec) {
  const info = getGridAreasInfo(spec)
  if (!info) return ''
  return info.rows.map(row => `"${row.split('').join(' ')}"`).join(' ')
}

function getGridColumnsForAreas(spec) {
  const info = getGridAreasInfo(spec)
  if (!info) return ''
  return `repeat(${info.colCount}, 1fr)`
}

function getGridRowsForAreas(spec) {
  const info = getGridAreasInfo(spec)
  if (!info) return ''
  return `repeat(${info.rowCount}, 1fr)`
}

function getCardsWithAreas(spec, cards) {
  const info = getGridAreasInfo(spec)
  if (!info || !Array.isArray(cards)) return []
  
  return cards.map((card, idx) => ({
    ...card,
    originalIndex: idx,
    gridArea: info.uniqueChars[idx] || 'auto'
  })).filter((_, idx) => idx < info.uniqueChars.length)
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
