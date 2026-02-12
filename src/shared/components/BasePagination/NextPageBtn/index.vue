<script setup lang="ts">
interface INextPageBtnProps {
  disabled: boolean;
  toNext: () => void;
}
defineProps<INextPageBtnProps>();
defineOptions({ name: 'NextPageBtn' });
</script>

<template>
  <li tabIndex="{0}">
    <button tabIndex="{-1}" className="next-page-btn" :disabled="disabled" @click="toNext"></button>
  </li>
</template>

<style lang="scss" scoped>
.next-page-btn {
  width: 10px;
  height: 10px;
  margin-left: 5px;
  margin-right: 2px;
  background-image: url('@/shared/assets/arrow-left.svg');
  transform: rotateY(180deg);

  &:disabled {
    opacity: 0.2;
  }
}
</style>
