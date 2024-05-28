<script setup>

import { ref, onMounted, onUpdated} from 'vue';
import YAML from 'yaml';
import { Icon } from '@iconify/vue';
const data = ref(null)
const items = ref(null)
const cols = ref('')

onMounted(()=>{
    items.value = YAML.parse(data.value.textContent)
    cols.value = `grid-cols-${items.value.length}`
})

onUpdated(()=>{
    cols.value = `grid-cols-${items.value.length}`
})
</script>
<template>
<div class="grid w-full h-full text-center place-items-center" :class="cols">

<div ref="data" style="display:none">
<slot/>
</div>
<div v-for="(item,index) in items" :key="index" class="text-center">
    <!-- <component :is="item.icon" class="text-gray text-16 mb-4 inline-block" /> -->
    <Icon :icon="item.icon" class="text-gray text-16 mb-4 inline-block" />
    <div class="mb-0 text-4">{{ item.title }}</div>
    <div class="mt-0 text-3 text-primary italic">{{ item.sub}}</div>
</div>
</div>
</template>
