import re

with open('layouts/cards.vue', 'r') as f:
    content = f.read()

# Add the area grid template
area_grid_template = """    <!-- 2D gridspec grid mode -->
    <div
      v-else-if="isAreaGrid($frontmatter.gridspec)"
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
        v-for="(card, index) in getCardsWithAreas($frontmatter.gridspec)"
        :key="index"
        class="card-area-wrapper"
        :style="{ gridArea: card.area }"
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
          :iconSize="card.iconSize"
          :iconColor="card.iconColor"
        >
          <div v-html="card.content"></div>
        </Card>
      </div>
    </div>
    <div
      v-else"""

content = content.replace('    <div\n      v-else', area_grid_template)

# Replace {{ card.content }} with <div v-html="card.content"></div>
content = content.replace('{{ card.content }}', '<div v-html="card.content"></div>')

# Add JS functions
js_funcs = """
function isAreaGrid(spec) {
  if (!spec) return false;
  return String(spec).trim().includes('\\n');
}

function getGridAreasInfo(spec) {
  if (!spec) return null;
  const rows = String(spec).trim().split('\\n').map(r => r.trim()).filter(r => r.length > 0);
  if (rows.length === 0) return null;
  const raw = rows.join('').replace(/\\s+/g, '');
  if (!raw) return null;
  const uniqueChars = [...new Set(raw.split('').map(c => c.toUpperCase()))];
  return { rows, uniqueChars, colCount: rows[0].length, rowCount: rows.length };
}

function getGridTemplateAreas(spec) {
  const info = getGridAreasInfo(spec);
  if (!info) return '';
  return info.rows.map(row => `"${row.split('').join(' ')}"`).join(' ');
}

function getGridColumnsForAreas(spec) {
  const info = getGridAreasInfo(spec);
  if (!info) return '';
  return `repeat(${info.colCount}, 1fr)`;
}

function getGridRowsForAreas(spec) {
  const info = getGridAreasInfo(spec);
  if (!info) return '';
  return `repeat(${info.rowCount}, 1fr)`;
}

function getCardsWithAreas(spec) {
  const info = getGridAreasInfo(spec);
  if (!info) return [];
  
  const cards = [];
  let cardIndex = 0;
  
  for (let i = 0; i < info.uniqueChars.length; i++) {
    if (cardIndex < parsedCards.value.length) {
      cards.push({
        ...parsedCards.value[cardIndex],
        originalIndex: cardIndex,
        area: info.uniqueChars[i]
      });
      cardIndex++;
    }
  }
  return cards;
}

function getGridGroups(spec) {"""

content = content.replace('function getGridGroups(spec) {', js_funcs)

# Update getGridGroups to return null if it's an area grid
content = content.replace('function getGridGroups(spec) {', 'function getGridGroups(spec) {\n  if (isAreaGrid(spec)) return null;')

# Add CSS rules
css_rules = """
/* CSS Overrides to make Card fluid inside 2D grid areas */
.card-area-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.card-area-wrapper :deep(.card-wrapper) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column;
}

.card-area-wrapper :deep(.card-container) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: row; /* Default for landscape */
  flex: 1;
}

.card-area-wrapper :deep(.card-portrait.card-container) {
  flex-direction: column;
}

/* Landscape icon mode */
.card-area-wrapper :deep(.card-landscape .card-icon-section) {
  width: 33.33% !important;
  height: 100% !important;
  flex-shrink: 0;
}
.card-area-wrapper :deep(.card-landscape .card-content) {
  width: 66.67% !important;
  height: 100% !important;
  flex: 1 !important;
}

/* Portrait icon mode */
.card-area-wrapper :deep(.card-portrait .card-icon-section) {
  width: 100% !important;
  height: 33.33% !important;
  flex-shrink: 0;
}
.card-area-wrapper :deep(.card-portrait .card-content) {
  width: 100% !important;
  height: 66.67% !important;
  flex: 1 !important;
}

/* Landscape image mode */
.card-area-wrapper :deep(.card-landscape .card-image) {
  width: 33.33% !important;
  height: 100% !important;
  flex-shrink: 0;
}

/* Portrait image mode */
.card-area-wrapper :deep(.card-portrait .card-image) {
  width: 100% !important;
  height: 33.33% !important;
  flex-shrink: 0;
}
</style>"""

content = content.replace('</style>', css_rules)

with open('layouts/cards.vue', 'w') as f:
    f.write(content)
