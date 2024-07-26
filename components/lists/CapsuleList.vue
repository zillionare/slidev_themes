<!--

# usage:

<CapsuleList>

    ```yaml
    quantiles, bins, binning_by_group, groupby, zero_aware
    ```
</CapsuleList>

-->


<script setup>
import { computed, ref, onMounted, reactive } from 'vue';
import YAML from 'yaml';

const raw = ref(null);
const data = reactive({
    items: []
})
const props = defineProps({
    orientation: {
        type: String,
        default: 'vertical',
        validator: value => ['vertical', 'horizontal'].includes(value)
    }
});

onMounted(() => {
    data.items = YAML.parse(raw.value.textContent)
    console.log(data, raw.value.textContent)
});

const orientation = computed(() => props.orientation);

</script>


<style scoped>
.capsule-container {
    display: flex;
}

.capsule-container.vertical {
    flex-flow: column;
    justify-content: space-between;
}

.horizontal .capsule-item {
    margin-right: 10px;
    margin-bottom: 10px;
}

.vertical .capsule-item {
    margin-bottom: 10px;
}

.capsule-item {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: 20px;
    background-image: url("https://images.jieyu.ai/images/hot/blue-purple-gradient.jpg");
    line-height: 1.5;
}
</style>

<template>
    <div slot style="display:none" ref="raw">
        <slot />
    </div>
    <div :class="['capsule-container', { horizontal, vertical: !horizontal }, $attrs.class]" v-bind="$attrs" v-motion>
        <template v-for="(item, index) in data.items" :key="index">
            <div class="capsule-item">{{ item }}</div>
        </template>
    </div>
</template>
