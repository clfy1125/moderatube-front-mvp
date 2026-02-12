<script setup lang="ts">
import { formatCompactNumber } from '@/shared/utils/formatCompactNumber';

interface ILikesCellProps {
  count?: number;
}
defineProps<ILikesCellProps>();
defineOptions({ name: 'LikesCell' });
</script>

<template>
  <div class="likes-cell">{{ formatCompactNumber(count) }}</div>
</template>

<style lang="scss" scoped>
.likes-cell {
  text-align: center;

  @include fontStyle(12px, 400, $gray_3);

  @include tablet {
    font-size: 11px;
  }
}
</style>
