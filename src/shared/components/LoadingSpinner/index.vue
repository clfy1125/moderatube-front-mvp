<script setup lang="ts">
defineOptions({ name: 'LoadingSpinner' });
</script>

<template>
  <div class="spinner"></div>
</template>

<style lang="scss" scoped>
.spinner {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('@/shared/assets/spinner-gray-icon.svg');
  background-size: contain;
  animation: rotation 1.4s steps(12) infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
