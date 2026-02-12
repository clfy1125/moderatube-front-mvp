<script setup lang="ts">
defineOptions({ name: 'NotFound' });
</script>

<template>
  <div class="not-found">
    <div class="content">
      <div class="logo-icon"></div>
      <span>해당 페이지를 찾을 수 없습니다.</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .logo-icon {
      width: 120px;
      height: 200px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url('@/shared/assets/login-icon.png');
    }

    span {
      @include fontStyle(14px, 400, $gray_a);
    }
  }
}
</style>
