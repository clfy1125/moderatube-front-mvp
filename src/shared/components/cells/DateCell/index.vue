<script setup lang="ts">
import { formatDate } from '@/shared/utils/formatDate';

interface IDateCellProps {
  date: string;
}
defineProps<IDateCellProps>();
defineOptions({ name: 'DateCell' });
</script>

<template>
  <div class="date-cell">
    {{ formatDate(date) }}
  </div>
</template>

<style lang="scss" scoped>
.date-cell {
  text-align: center;

  @include fontStyle(12px, 400, $gray_3);

  @include tablet {
    font-size: 11px;
  }
}
</style>
