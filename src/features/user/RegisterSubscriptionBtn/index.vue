<script setup lang="ts">
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';

interface IRegisterSubscriptionBtnProps {
  productId?: number;
  text?: string;
}

defineProps<IRegisterSubscriptionBtnProps>();
defineOptions({ name: 'RegisterSubscriptionBtn' });

const onClickStartSubscription = () => {
  /* todo: 등록된 카드가 없다면 카드 등록해달라고 경고 띄우고 return */
};
</script>

<template>
  <TextBtn :text="`${text?.toUpperCase()} 시작하기`" @click="onClickStartSubscription" />
</template>

<style lang="scss" scoped></style>
