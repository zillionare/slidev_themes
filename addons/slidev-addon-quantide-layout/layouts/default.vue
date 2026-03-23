<template>
    <div class="slidev-layout default">
        <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
        <slot />
    </div>
</template>
