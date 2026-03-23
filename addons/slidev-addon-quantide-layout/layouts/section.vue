<!-- borrowed from https://github.com/moudev/slidev-theme-purplin -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
    img: {
        type: String
    },
    imgOrder: {
        type: Number,
        default: 2
    }
})

const image = computed(() => props.img || '/section-right.jpg')
const imageOrder = computed(() => props.imgOrder === 1 ? 'order-1' : 'order-2')
const textAlignment = computed(() => props.imageOrder === 1
    ? 'text-right order-2 justify-end'
    : 'text-left order-1 justify-start')
</script>

<template>
    <div class="slidev-layout section h-full grid image-x">
        <div class="my-auto flex">
            <div class="w-1/2 flex justify-center items-center max-h-md object-cover" :class="imageOrder">
                <img :src="image" class="border-image h-full object-cover" />
            </div>
            <div class="w-1/2 flex flex-col justify-center" :class="textAlignment">
                <h1>{{ $frontmatter.title }}</h1>
                <slot />
            </div>
        </div>
    </div>
</template>
