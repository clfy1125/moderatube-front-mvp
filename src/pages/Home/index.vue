<!-- 메인 홈(대시보드) -->
<script setup lang="ts">
import Widget from './Widget/index.vue';

defineOptions({ name: 'HomePage' });
</script>

<template>
  <section id="home-page">
    <Widget />
  </section>
</template>

<style lang="scss" scoped>
#home-page {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
