<style scoped>
.seq {
    position: fixed;
    top: 0;
    text-align: left;
    left: 0;
    background-color: var(--primary);
    padding: 0.3rem 1rem 0.3rem 1rem;
    border-radius: 0 2rem 0 2rem;
    
}
</style>
<template>
    <div class="slidev-layout default">
        <div class="seq">{{ $frontmatter.title }}</div>
        <slot />
    </div>
</template>
