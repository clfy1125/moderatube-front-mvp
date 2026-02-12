<script setup lang="ts">
interface IPrevPageBtnProps {
  disabled: boolean;
  toPrev: () => void;
}
defineProps<IPrevPageBtnProps>();
defineOptions({ name: 'PrevPageBtn' });
</script>

<template>
  <li tabIndex="{0}">
    <button tabIndex="{-1}" className="prev-page-btn" :disabled="disabled" @click="toPrev"></button>
  </li>
</template>

<style lang="scss" scoped>
.prev-page-btn {
  width: 10px;
  height: 10px;
  margin-left: 2px;
  margin-right: 5px;
  background-image: url('@/shared/assets/arrow-left.svg');

  &:disabled {
    opacity: 0.2;
  }
}
</style>
