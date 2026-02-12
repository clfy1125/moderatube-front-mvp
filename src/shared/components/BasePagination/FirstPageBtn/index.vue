<script setup lang="ts">
interface IFirstPageBtnProps {
  disabled: boolean;
  toFirst: () => void;
}
defineProps<IFirstPageBtnProps>();
defineOptions({ name: 'FirstPageBtn' });
</script>

<template>
  <li tabIndex="{0}">
    <button tabIndex="{-1}" className="first-page-btn" :disabled="disabled" @click="toFirst"></button>
  </li>
</template>

<style lang="scss" scoped>
.first-page-btn {
  width: 10px;
  height: 10px;
  margin-right: 2px;
  background-image: url('@/shared/assets/arrow-left-double.svg');

  &:disabled {
    opacity: 0.2;
  }
}
</style>
