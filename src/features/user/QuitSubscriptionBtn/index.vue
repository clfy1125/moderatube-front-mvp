<script setup lang="ts">
defineOptions({ name: 'QuitSubscriptionBtn' });

const onClickCancelAutoChargeBtn = () => {
  // ...
};
</script>

<template>
  <button class="quit-subscription-btn" @click="onClickCancelAutoChargeBtn">자동 충전 취소</button>
</template>

<style lang="scss" scoped>
.quit-subscription-btn {
  background-color: transparent;

  @include fontStyle(12px, 400, $gray_7);
}
</style>
