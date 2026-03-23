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
        :style="{ gridArea: area }"
      >
        <!-- Use lower case slot name by convention in Slidev (::a::, ::b::) -->
        <slot :name="area.toLowerCase()" />
        <!-- Also provide upper case slot name just in case user writes ::A:: -->
        <slot :name="area" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Get unique characters from gridspec
function getUniqueAreas(spec) {
  if (!spec) return [];
  const raw = String(spec).trim().replace(/\s+/g, '');
  return [...new Set(raw.split('').map(c => c.toUpperCase()))];
}

function getGridAreasInfo(spec) {
  if (!spec) return null;
  const rows = String(spec).trim().split('\n').map(r => r.trim()).filter(r => r.length > 0);
  if (rows.length === 0) return null;
  const raw = rows.join('').replace(/\s+/g, '');
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
  /* Add some basic padding or styling if needed, but usually we let the user control it */
  border-radius: 8px;
}

/* Add a subtle border or background if we want default card-like appearance, 
   but it's better to let user define content. We'll leave it transparent. */
</style>
