<script setup lang="ts">
import LoadingSpinner from '@/shared/components/LoadingSpinner/index.vue';
defineOptions({ name: 'IsPending' });
</script>

<template>
  <div class="is-pending">
    <LoadingSpinner />
  </div>
</template>

<style lang="scss" scoped>
.is-pending {
  display: flex;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
}
</style>
