<script setup lang="ts">
import Widget from './Widget/index.vue';

defineOptions({ name: 'ProfilePage' });
</script>

<template>
  <section id="profile-page">
    <Widget />
  </section>
</template>

<style lang="scss" scoped>
#profile-page {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
