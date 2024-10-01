<!--
  Usage:
```md
---
layout: two-cols
---

# Left
This shows on the left
::right::
# Right
This shows on the right
```
-->

<script setup lang="ts">
const props = defineProps({
    class: {
        type: String,
    },
    layoutClass: {
        type: String,
    },
})
</script>

<template>
    <div class="slidev-layout w-full h-full" :class="layoutClass">
        <div class="seq">{{ $frontmatter.title }}</div>

        <div class="col-left" :class="props.class">
            <slot />
        </div>
        <div class="col-right" :class="props.class">
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
    top: 12%;
    width: 50%;
    height: 88%;
    left: 0;
    padding-left: 1rem;
}

.col-right {
    position: absolute;
    top: 12%;
    left: 50%;
    width: 50%;
    height: 88%;
    padding: 1rem;
}
</style>
