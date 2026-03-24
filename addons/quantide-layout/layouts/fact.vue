<template>
  <div class="slidev-layout fact h-full flex flex-col">
    <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
    <div class="my-auto text-center">
      <slot />
    </div>
  </div>
</template>
