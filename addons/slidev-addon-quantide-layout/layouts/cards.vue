<template>
  <div class="slidev-layout cards-layout">
    <!-- Hidden div to capture slot content -->
    <div ref="slotRef" style="display: none;">
      <slot />
    </div>
    <!-- this is title -->
    <div class="title">{{ $frontmatter.title }}</div>
    <div class="cards-container">
      <Card
        v-for="(card, index) in parsedCards"
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
      
      // Look for list items in HTML format "<li>key: value</li>"
      const listItems = configText.match(/<li>([^<]+)<\/li>/g) || []

      listItems.forEach(item => {
        const match = item.match(/<li>(\w+):\s*([^<]+)<\/li>/)
        if (match) {
          const [, key, value] = match
          if (key === 'content') {
            content = value.trim()
          } else {
            config[key] = value.trim()
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
  height: 100vh;
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
  margin-top: 2.5rem;
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