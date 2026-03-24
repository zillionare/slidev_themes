<style>
.footer {
    position: fixed;
    width: 100%;
    bottom: 40px;
    height: 2rem;
    color: var(--text-tertiary, #808080);
    text-align:  center;
    font-size: 1.5em;
}


</style>

<template>
    <div v-if="($slidev.nav.currentPage !== $slidev.nav.total) & ($slidev.nav.currentPage !== 1) & ($slidev.configs.showFooter)" class="footer">
        <!-- middle pages -->
        <div>
            {{ $slidev.nav.currentPage }}/{{ $slidev.nav.total }} ﹫匡醍量化
        </div>
    </div>
</template>
