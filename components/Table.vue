<script setup>

import { onMounted, onUpdated, ref } from 'vue';
import YAML from 'yaml';
const data = ref(null)
const body = ref(null)
const head = ref(null)
const cols = ref('')
const ncols = ref(null)

const props = defineProps({
  class: {
    default: 'z-table',
  },
})

onMounted(()=>{
    const parsed = YAML.parse(data.value.textContent)
    body.value = parsed.body
    head.value = parsed.head.split(",")
    const ncols = parsed.head.split(",").length
    cols.value = `grid-cols-${ncols}`
})

onUpdated(()=>{
    cols.value = `grid-cols-${ncols}`
})
</script>
<template>
<div class="grid w-full h-full text-center place-items-center" :class="cols">

<div ref="data" style="display:none">
<slot/>
</div>
<table :class="props.class">
    <thead><th v-for="item in head">{{ item }}</th></thead>
    <tbody>
    <tr v-for="(row,index) in body" :key="index" >
        <td v-for="text in row.split(',')">{{ text }}</td>
    </tr>
    </tbody>
</table>
</div>
</template>
