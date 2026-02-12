<script setup lang="ts">
interface IDashboardProps {
  className?: string;
  title: string;
}

defineProps<IDashboardProps>();
defineOptions({ name: 'DashboardPanel' });
</script>

<template>
  <div :class="['panel', className]">
    <div class="header">{{ title }}</div>
    <slot> </slot>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  .header {
    margin-bottom: 20px;
    padding: 40px 30px 0 30px;

    @include fontStyle(16px, 600, $gray_3);

    @include tablet {
      padding: 24px 24px 0 24px;
      margin-bottom: 10px;
      font-size: 12px;
    }
  }
}
</style>
