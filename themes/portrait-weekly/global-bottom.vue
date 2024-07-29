<style>
footer {
    color: #404040;
    z-index: 999;
    font-size: 1.8vw;
}
</style>
<script>

</script>
<template>
    <footer class="absolute bottom-0 left-5"><br /><small>
            <SlideCurrentNo />/
            <SlidesTotal />
        </small>
    </footer>
    <footer v-if="$slidev.nav.currentPage === $slidev.nav.total"
        class="absolute bottom-0 right-10 p-2 flex items-center">
        <span style="color:#a0a0a0">公众号: QuanTide 量化风云</span>
        <span><img width=64 src="https://images.jieyu.ai/images/hot/quantfans.png" /></span>
    </footer>
    <footer v-if="($slidev.nav.currentPage !== $slidev.nav.total) & ($slidev.nav.currentPage !== 1)"
        class="absolute bottom-0 right-10 p-2 flex items-center">
        <span style="color:#a0a0a0">公众号: QuanTide 量化风云</span>
    </footer>
</template>
