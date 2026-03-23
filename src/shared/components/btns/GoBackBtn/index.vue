<script setup lang="ts">
import { useRouter } from 'vue-router';

interface IGoBackBtnProps {
  text: string;
  link: '/app/channel-management' | '/app/profile';
}

defineProps<IGoBackBtnProps>();
defineOptions({ name: 'GoBackBtn' });

const router = useRouter();
</script>

<template>
  <button class="go-back-btn" @click="router.replace(link)">
    <div class="left-arrow-icon"></div>
    <span>{{ text }}</span>
  </button>
</template>

<style lang="scss" scoped>
.go-back-btn {
  display: flex;
  align-items: center;
  height: 18px;
  gap: 8px;
  background-color: transparent;

  .left-arrow-icon {
    width: 12px;
    height: 12px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url('@/shared/assets/left-arrow-icon.svg');
  }

  span {
    @include fontStyle(14px, 400, $gray_3);
  }
}
</style>
