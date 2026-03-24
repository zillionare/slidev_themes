<script setup lang="ts">
import { computed } from 'vue'

const showTitle = computed(() => {
    const rawTitle = typeof $frontmatter.title === 'string' ? $frontmatter.title.trim() : ''
    if (!rawTitle) return false
    if (rawTitle.toLowerCase() === 'na') return false
    if ($frontmatter.hideTitle) return false
    return true
})
</script>

<template>
    <div class="slidev-layout default">
        <h1 v-if="showTitle" class="page-title">{{ $frontmatter.title }}</h1>
        <div v-if="showTitle" class="title-divider" />
        <div v-else class="title-spacer" />
        <slot />
    </div>
</template>

<style scoped>
.page-title {
    text-align: center;
    margin-bottom: 0.75rem;
}

.title-divider {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.15);
    margin-bottom: 1.25rem;
}

.title-spacer {
    height: 2.5rem;
}
</style>
