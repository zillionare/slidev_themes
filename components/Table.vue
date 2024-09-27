<!--

<Table sep='|'>

```yaml
head: time|interest|dr
body:
    - 2018|0.5|20
```
</Table>

-->
<script setup>

import { onMounted, onUpdated, ref } from 'vue';
import YAML from 'yaml';
const data = ref(null)
const body = ref(null)
const head = ref(null)
const cols = ref('')
const ncols = ref(null)

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
    const parsed = YAML.parse(data.value.textContent)

    body.value = parsed.body
    head.value = parsed.head.split(props.sep)
})

onUpdated(() => {
    cols.value = `grid-cols-${ncols}`
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

<style scoped>
.z-table {
    background: white;
    border-radius: 3px;
    border-collapse: collapse;
    margin: auto;
    max-width: 800px;
    padding: 5px;
    width: 80%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    animation: float 5s infinite;

    th {
        color: #D5DDE5;
        background: #1b1e24;
        border-bottom: 1px solid #9ea7af;
        border-right: 1px solid #343a45;
        font-size: 1.1em;
        font-weight: 100;
        text-align: center;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        vertical-align: middle;
    }

    th:first-child {
        border-top-left-radius: 3px;
    }

    th:last-child {
        border-top-right-radius: 3px;
        border-right: none;
    }

    tr {
        border-top: 1px solid #C1C3D1;
        border-bottom: 1px solid #C1C3D1;
        color: #666B85;
        font-weight: normal;
        text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
    }

    tr:hover td {
        background: #4E5066;
        color: #FFFFFF;
        border-top: 1px solid #22262e;
    }

    tr:first-child {
        border-top: none;
    }

    tr:last-child {
        border-bottom: none;
    }

    tr:nth-child(odd) td {
        background: #EBEBEB;
    }

    tr:nth-child(odd):hover td {
        background: #4E5066;
    }

    tr:last-child td:first-child {
        border-bottom-left-radius: 3px;
    }

    tr:last-child td:last-child {
        border-bottom-right-radius: 3px;
    }

    td {
        background: #FFFFFF;
        text-align: center;
        vertical-align: middle;
        font-weight: 300;
        text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
        border-right: 1px solid #C1C3D1;
    }

    td:last-child {
        border-right: 0px;
    }

    th.text-left {
        text-align: left;
    }

    th.text-center {
        text-align: center;
    }

    th.text-right {
        text-align: right;
    }

    td.text-left {
        text-align: left;
    }

    td.text-center {
        text-align: center;
    }

    td.text-right {
        text-align: right;
    }
}
</style>
