<!-- 댓글관리 페이지 -->
<script setup lang="ts">
import Widget from './Widget/index.vue';

defineOptions({ name: 'CommentManagementPage' });
</script>

<template>
  <section id="comment-management-page">
    <Widget />
  </section>
</template>

<style lang="scss" scoped>
#comment-management-page {
  flex-grow: 1;
  overflow-y: auto;

  @include tablet {
    height: 100%;
    overflow: hidden;
  }
}
</style>
