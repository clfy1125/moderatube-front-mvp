<script setup lang="ts">
interface ILastPageBtnProps {
  disabled: boolean;
  toLast: () => void;
}
defineProps<ILastPageBtnProps>();
defineOptions({ name: 'LastPageBtn' });
</script>

<template>
  <li tabIndex="{0}">
    <button tabIndex="{-1}" className="last-page-btn" :disabled="disabled" @click="toLast"></button>
  </li>
</template>

<style lang="scss" scoped>
.last-page-btn {
  width: 10px;
  height: 10px;
  margin-left: 2px;
  background-image: url('@/shared/assets/arrow-left-double.svg');
  transform: rotateY(180deg);

  &:disabled {
    opacity: 0.2;
  }
}
</style>
