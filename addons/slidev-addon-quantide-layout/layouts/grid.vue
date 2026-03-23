<template>
  <div class="slidev-layout grid-layout">
    <!-- title -->
    <div class="title" v-if="$frontmatter.title">{{ $frontmatter.title }}</div>
    
    <div
      class="grid-container"
      :style="{
        marginTop: ($frontmatter.top !== undefined && $frontmatter.top !== null)
          ? (typeof $frontmatter.top === 'number' ? `${$frontmatter.top}px` : String($frontmatter.top))
          : ($frontmatter.title ? '3.5rem' : '0'),
        display: 'grid',
        gridTemplateAreas: getGridTemplateAreas($frontmatter.gridspec),
        gridTemplateColumns: getGridColumnsForAreas($frontmatter.gridspec),
        gridTemplateRows: getGridRowsForAreas($frontmatter.gridspec),
        gap: $frontmatter.gap || '20px',
        height: '100%',
        flex: 1
      }"
    >
      <div
        v-for="area in getUniqueAreas($frontmatter.gridspec)"
        :key="area"
        class="grid-area-wrapper"
        :class="{ 'grid-area-card': $frontmatter.cards !== false }"
        :style="{ gridArea: area }"
      >
        <!-- Use slot name based on the area name (lowercase) -->
        <slot :name="area" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Get unique characters from gridspec, normalized to lower case for consistency
function getUniqueAreas(spec) {
  if (!spec) return [];
  const raw = String(spec).trim().replace(/\s+/g, '').toLowerCase();
  return [...new Set(raw.split(''))];
}

function getGridAreasInfo(spec) {
  if (!spec) return null;
  const rows = String(spec).trim().split('\n').map(r => r.trim().toLowerCase()).filter(r => r.length > 0);
  if (rows.length === 0) return null;
  const raw = rows.join('').replace(/\s+/g, '');
  if (!raw) return null;
  const uniqueChars = [...new Set(raw.split(''))];
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

.slidev-layout.grid-layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  margin: 0;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0;
}

.grid-container {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 1rem;
}

.grid-area-wrapper {
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow: auto; /* Allow scrolling if content is too long */
}

/* Default card styling, can be disabled with `cards: false` in frontmatter */
.grid-area-card {
  border: 1px solid var(--slidev-theme-border, rgba(128, 128, 128, 0.2));
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  background-color: var(--slidev-theme-surface, transparent);
  box-sizing: border-box;
}

.grid-area-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
