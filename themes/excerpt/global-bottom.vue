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
  <footer class="absolute bottom-0 left-5"><br/><small><SlideCurrentNo/>/<SlidesTotal/></small></footer>
  <footer
    v-if="$slidev.nav.currentLayout !== 'cover'"
    class="absolute bottom-0 right-0 p-2 flex items-center"
  >
    <span class="c-green-4"></span>
  </footer>
</template>
