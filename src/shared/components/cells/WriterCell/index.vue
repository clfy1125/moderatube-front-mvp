<script setup lang="ts">
import Tooltip from '@/shared/components/ToolTip/index.vue';

interface IWriterCellProps {
  name: string;
  authorProfileImageUrl?: string;
}

defineProps<IWriterCellProps>();
defineOptions({ name: 'WriterCell' });
</script>

<template>
  <Tooltip class="writer-cell" :text="name">
    <div class="writer-icon" :style="{ backgroundImage: `url(${authorProfileImageUrl})` }"></div>
    <div class="writer-name">{{ name }}</div>
  </Tooltip>
</template>

<style lang="scss" scoped>
.writer-cell {
  display: flex;
  align-items: center;
  gap: 6px;

  @include fontStyle(12px, 400, $gray_3);

  @include tablet {
    font-size: 11px;
  }

  .writer-icon {
    flex-shrink: 0;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url('@/shared/assets/writer-icon.svg');
  }

  .writer-name {
    width: fit-content;
    height: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
