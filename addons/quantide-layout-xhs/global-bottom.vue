<style>
.footer {
    position: fixed;
    width: 100%;
    bottom: 0px;
    height: 2rem;
    color: color-mix(in srgb, var(--text-primary) 55%, var(--bg-primary, white));
    text-align: center;
    font-size: 0.8em;
    z-index: 100;
}
</style>

<template>
    <div v-if="$slidev.nav.currentPage !== $slidev.nav.total && $slidev.nav.currentPage !== 1 && $slidev.configs.showFooter"
        class="footer">
        <!-- middle pages -->
        <div>
            {{ $slidev.nav.currentPage }}/{{ $slidev.nav.total }} ﹫匡醍量化
        </div>
    </div>
</template>
