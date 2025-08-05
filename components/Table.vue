<!--

<Table sep='|'>

```md
time|interest|dr
2018|0.5|20
```
</Table>

-->
<script setup>

import { onMounted, ref } from 'vue';
const data = ref(null)
const body = ref(null)
const head = ref(null)

const props = defineProps({
    theme: {
        default: 'z-table',
    },
    sep: {
        type: String,
        default: ','
    }
})

onMounted(() => {
    const content = data.value.textContent.trim()
    const lines = content.split('\n').filter(line => line.trim())

    if (lines.length > 0) {
        // 第一行作为表头
        head.value = lines[0].split(props.sep)
        // 其余行作为表体
        body.value = lines.slice(1)
    }
})


</script>
<template>
    <div :class="$attrs.class" v-bind="$attrs">

        <div ref="data" style="display:none">
            <slot />
        </div>
        <table :class="props.theme">
            <thead>
                <th v-for="item in head">{{ item }}</th>
            </thead>
            <tbody>
                <tr v-for="(row, index) in body" :key="index">
                    <td v-for="text in row.split(props.sep)">{{ text }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
