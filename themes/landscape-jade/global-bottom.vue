<style>
.footer {
    position: fixed;
    bottom: 0;
    height: 2rem;
    right: 1rem;
    color: #a0a0a0;
}

.cut-me {
    position: fixed;
    z-index: 100;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .7);
}

.cut-me-logo {
    position: fixed;
    width: 300px;
    height: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-image: url(https://images.jieyu.ai/images/hot/logo/quantide-alpha-yellow.jpg);
    background-size: cover;
    border-radius: 50% 50%;
    font-size: 5vw;
    color: white;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
</style>
<script>
import { ref, computed } from 'vue'
const cut = ref(false)

// 禁止ipad safari中的长按菜单
// window.ontouchstart = function (e) {
//     e.preventDefault()
// }

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    var search = new URLSearchParams(location.search)
    var clicks = parseInt(search.get("clicks"))
    // console.info("clicks now is: " + clicks)

    if (e.keyCode == '224') {
        cut.value = !cut.value
    }
    if (e.keyCode == '37') {
        // left right and space
        if (clicks == NaN || clicks <= 1) {
            return
        }

        clicks = clicks - 1
    }
    else if (e.keyCode == '39' || e.keyCode == '32') {
        if (clicks == NaN) {
            clicks = 1
        } else {
            clicks = clicks + 1
        }
    }

    // scroll to SEC?
    document.querySelectorAll('div.note h1').forEach(function (item) {
        if (item.innerText.toUpperCase().startsWith('SEC' + clicks)) {
            item.scrollIntoView()
        }
    });

}

const cutMeStyle = computed(() => {
    if (cut.value) {
        console.log("show cut me", cut.value)
        return {
            display: 'block'
        }
    } else {
        return {
            display: 'none'
        }
    }
})


</script>
<template>
    <div v-if="($slidev.nav.currentPage !== $slidev.nav.total) & ($slidev.nav.currentPage !== 1)" class="footer">
        <!-- middle pages -->
        <small>
            P{{ $slidev.nav.currentPage }}-{{ $slidev.nav.clicks }}
        </small>
    </div>
    <div class="cut-me" :style="cutMeStyle">
        <div class="cut-me-logo">{{ $slidev.nav.currentPage }}-{{ $slidev.nav.clicks }}</div>
    </div>
</template>
