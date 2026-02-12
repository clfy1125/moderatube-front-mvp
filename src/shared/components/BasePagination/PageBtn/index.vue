<script setup lang="ts">
interface IPageBtnProps {
  value: number;
  disabled: boolean;
}
const props = defineProps<IPageBtnProps>();
defineEmits<{ (e: 'click', value: number): void }>();
defineOptions({ name: 'PageBtn' });
</script>

<template>
  <button class="page-btn" :disabled="disabled" @click="$emit('click', props.value)">{{ value }}</button>
</template>

<style lang="scss" scoped>
.page-btn {
  margin-left: 2px;
  margin-right: 2px;
  background-color: transparent;

  @include fontStyle(12px, 400, $gray_a);

  &:disabled {
    color: $key_color;
  }
}
</style>
