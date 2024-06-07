<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        default: "Audio"
    },
    fadeOut: {
        type: Number,
        default: 0
    },
    fadeIn: {
        type: Number,
        default: 0
    },
    at: {
        type: Number,
        default: 0
    }
})

function fadeOut(duration, fadeOutStart, sound) {
    var fadePoint = Math.floor(duration - fadeOutStart);

    var timer = setInterval(function () {
        // Only fade if past the fade out point or not at zero already
        if ((sound.currentTime >= fadePoint) && (sound.volume >= 0.0)) {
            var volume = Math.max(0, sound.volume - 0.1)
            if (volume > 0) {
                sound.volume = volume
            } else {
                clearInterval(timer)
            }
        }
    }, 200);
}

function fadeIn(resetAt, sound) {
    sound.volume = 0
    var timer = setInterval(function () {
        if ((sound.currentTime < resetAt) && (sound.volume < 1)) {
            var volume = Math.max(0, sound.volume + 0.1)
            if (volume > 0) {
                sound.volume = volume
            } else {
                clearInterval(timer)
            }
        }
    }, 200);
}

onMounted(() => {
    var sound = document.querySelector(`#${props.id}`);

    // Set the point in playback that fadeout begins. 
    if (props.fadeOut != 0) {
        sound.onloadedmetadata = () => {
            fadeOut(sound.duration, props.fadeOut, sound)
        };
    }

    if (props.fadeIn != 0) {
        fadeIn(props.fadeIn, sound)
    }
})
</script>
<template>
    <div v-if="$slidev.nav.clicks === $props.at">
        <audio :id="props.id" autoplay preload="auto" :src="$props.src"></audio>
    </div>
</template>
