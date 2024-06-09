<script setup>
import { onMounted, computed } from 'vue';

var gallery = {
    "du": "https://images.jieyu.ai/images/sounds/du.wav",
    "mouse-click": "https://images.jieyu.ai/images/sounds/mouse-click.wav",
    "tida": "https://images.jieyu.ai/images/sounds/tida.aiff",
    "wechat-dingdong": "https://images.jieyu.ai/images/sounds/wechat-dingdong.wav",
    "wechat-huwo": "https://images.jieyu.ai/images/sounds/wechat-huwo.mp3"
}
const props = defineProps({
    name: {
        type: String,
        required: true,
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
        default: -1,
    },
    volume: {
        type: Number,
        default: 1
    },
    delay: {
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


const src = computed(() => {
    var isurl = props.name.substr(0, 4) === "http"
    if (isurl) {
        return props.name
    }

    // 带扩展名，是http://images.jieyu.ai/images/sounds下的文件
    var ext = props.name.split(".").pop(-1)
    if (["mp3", "wav", "aiff"].includes(ext)) {
        return "https://images.jieyu.ai/images/sounds/" + props.name
    }

    // 不带扩展名，是预置文件
    return gallery[props.name]
})

const show = computed(() => {
    if (Array.isArray(props.at)) {
        return props.at.includes($slidev.nav.clicks)
    } else {
        return [-1, $slidev.nav.clicks].includes(props.at)
    }
})

const audioId = computed(() => {
    var seq = Math.floor(Math.random() * 10000)
    return `#audio_${seq}`
})

onMounted(() => {
    var sound = document.getElementById(audioId.value);

    sound.volume = props.volume

    var count = localStorage.getItem(audioId.value)
    if (count == null) {
        localStorage.setItem(audioId.value, 1)
        setTimeout(() => {
            sound.play()
        }, props.delay)
    }

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
    <div v-show="show">
        <audio :id="audioId" :src="src"></audio>
    </div>
</template>
