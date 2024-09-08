<style>
.footer {
    position: fixed;
    bottom: 0;
    height: 2rem;
    right: 1rem;
    color: #a0a0a0;
}
</style>
<script>

document.onkeydown = checkKey;
localStorage.clear()
function checkKey(e) {
    e = e || window.event;
    // console.info("key pressed: " + e.keyCode)

    var search = new URLSearchParams(location.search)
    var clicks = parseInt(search.get("clicks"))
    // console.info("clicks now is: " + clicks)

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

// const clicks = computed(()=>{
//     var search = new URLSearchParams(location.search) 
//     return search.get("clicks")
// })
</script>
<template>
    <div v-if="($slidev.nav.currentPage !== $slidev.nav.total) & ($slidev.nav.currentPage !== 1)" class="footer">
        <!-- middle pages -->
        <small>
            {{ $slidev.nav.currentPage }}/{{ $slidev.nav.total }}
        </small>
    </div>
</template>
