<script setup lang="ts">
defineOptions({ name: 'CloseModalBtn' });
defineEmits(['on-click-btn']);
</script>

<template>
  <div class="close-btn-part">
    <button class="close-btn" @click="$emit('on-click-btn')"></button>
  </div>
</template>

<style lang="scss" scoped>
.close-btn-part {
  flex-shrink: 0;
  display: flex;
  justify-content: end;
  height: 14px;
  margin-bottom: 20px;

  .close-btn {
    width: 14px;
    height: 14px;
    background-position: center;
    background-repeat: repeat;
    background-image: url('@/shared/assets/close-btn-icon.svg');
    background-color: transparent;
  }
}
</style>
