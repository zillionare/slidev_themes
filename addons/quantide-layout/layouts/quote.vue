<template>
  <div class="slidev-layout quote h-full flex flex-col">
    <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
    <div class="my-auto">
      <slot />
    </div>
  </div>
</template>
