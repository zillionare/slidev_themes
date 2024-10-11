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
    <div class="slidev-layout w-full h-full" :class="class">
        <div class="seq">{{ $frontmatter.title }}</div>

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
</template>

<style scoped>
.seq {
    position: absolute;
    top: 0;
    text-align: left;
    left: 0;
    border-left: 5px solid rgba(0, 0, 0, 0.2);
    border-right: 5px solid rgba(0, 0, 0, 0.2);
    background-color: aliceblue;
    padding: 5px 20px 5px 10px;
    border-radius: 0 20px 0 20px;
}


.col-left {
    position: absolute;
    top: 10%;
    width: var(--col-left-width);
    height: 88%;
    left: 0;
    padding: var(--col-left-padding, 1rem);
}

.col-right {
    position: absolute;
    top: 10%;
    left: var(--col-right-start);
    width: var(--col-right-width);
    height: 88%;
    padding: var(--col-right-padding, 1rem);
}
</style>
