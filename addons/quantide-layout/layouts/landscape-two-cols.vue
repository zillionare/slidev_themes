<!--
  Usage:
```md
---
layout: two-cols
right: large
---

# Left
This shows on the left
::right::
# Right
This shows on the right
```
-->

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    class: {
        type: String,
    },
    left: {
        type: String,
        default: '50%'
    },
    right: {
        type: String,
        default: '50%'
    }
})

const colLeftPadding = computed(() => {
    return props.left !== '50%' ? '0rem' : '1rem'
})

const colRightPadding = computed(() => {
    return props.right !== '50%' ? '0rem' : '1rem'
})

const colRightStart = computed(() => {
    return props.right !== '50%' ? 'calc(100% - var(--col-right-width))' : '50%'
})

</script>

<template>
    <div class="slidev-layout w-full h-full landscape-two-cols" :class="class">
        <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>

        <div class="landscape-container">
            <div class="col-left" :style="{
            '--col-left-width': props.left,
            '--col-left-padding': colLeftPadding
        }">
                <slot />
            </div>
            <div class="col-right" :style="{
            '--col-right-width': props.right,
            '--col-right-start': colRightStart,
            '--col-right-padding': colRightPadding
        }">
                <slot name="right" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.landscape-two-cols {
    display: flex;
    flex-direction: column;
}

.landscape-container {
    flex: 1 1 auto;
    position: relative;
    width: 100%;
}

.col-left {
    position: absolute;
    top: 0;
    width: var(--col-left-width);
    height: 100%;
    left: 0;
    padding: var(--col-left-padding, 1rem);
}

.col-right {
    position: absolute;
    top: 0;
    left: var(--col-right-start);
    width: var(--col-right-width);
    height: 100%;
    padding: var(--col-right-padding, 1rem);
}
</style>
