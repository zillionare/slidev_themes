<template>
  <div class="slidev-layout center h-full flex flex-col">
    <h1 v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
    <div class="m-auto w-[60%] text-center">
      <slot />
    </div>
  </div>
</template>
