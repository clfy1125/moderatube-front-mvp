<script setup lang="ts">
interface ITextCellProps {
  text: string;
}

defineProps<ITextCellProps>();
defineOptions({ name: 'TextCell' });
defineEmits(['click']);
</script>

<template>
  <div :title="text" class="text-cell" @click="$emit('click')">{{ text }}</div>
</template>

<style lang="scss" scoped>
.text-cell {
  // height: inherit;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;

  @include fontStyle(12px, 400, $gray_3, 115%);

  @include tablet {
    padding-left: 4px;
    padding-right: 4px;
    font-size: 11px;
  }
}
</style>
