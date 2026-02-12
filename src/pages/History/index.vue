<script setup lang="ts">
import Widget from './Widget/index.vue';

defineOptions({ name: 'HistoryPage' });
</script>

<template>
  <section id="history-page">
    <Widget />
  </section>
</template>

<style lang="scss" scoped>
#history-page {
  flex-grow: 1;
  overflow-y: auto;

  @include tablet {
    height: 100%;
  }
}
</style>
