<style>
.footer {
    position: absolute;
    bottom: 0em;
    height: 4em;
    width: 92%;
    color: #a0a0a0;
    z-index: 999;
    font-size: 1.8vw;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    left: 4%;
    align-items: center;
}

.footer:before {
    position: absolute;
    content: ' ';
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
    height: 1px;
    top: -1em;
}

.watermark {
    position: fixed;
    top: 50%;
    left: 50%;
    color: rgba(224, 224, 224, 0.2);
    font-size: 4em;
    transform: translate(-50%, -50%) rotate(-45deg);
    z-index: 1000;
}
</style>
<script>

</script>
<template>
    <div v-if="($slidev.nav.currentPage !== $slidev.nav.total) & ($slidev.nav.currentPage !== 1)" class="footer">
        <!-- middle pages -->
        <div><small>
                <SlideCurrentNo />/
                <SlidesTotal />
            </small>
        </div>
        <div>公众号: QuanTide 量化风云</div>
        <div>{{ $slidev.configs.seq }}</div>
        <div class="watermark">
            公众号<br>QuanTide<br>量化风云
        </div>
    </div>

    <div v-if="$slidev.nav.currentPage === $slidev.nav.total" class="footer">
        <!-- last page -->
        <div>公众号: QuanTide 量化风云</div>
        <div><img width=64 src="https://images.jieyu.ai/images/hot/quantfans.png" /></div>
    </div>

</template>
