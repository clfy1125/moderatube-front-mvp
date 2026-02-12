<!-- 채널 관리 페이지 '/channel-management' -->
<script setup lang="ts">
import Widget from './Widget/index.vue';

defineOptions({ name: 'ChannelManagementPage' });
</script>

<template>
  <section id="channel-management-page">
    <Widget />
  </section>
</template>

<style lang="scss" scoped>
#channel-management-page {
  flex-grow: 1;
  overflow-y: auto;

  @include tablet {
    overflow-y: hidden;
  }
}
</style>
