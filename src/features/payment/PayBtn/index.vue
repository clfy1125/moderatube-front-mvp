<script setup lang="ts">
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';

interface IPayBtnProps {
  product: {
    product_id: number;
    credits: number;
    price: number;
    currency: string;
    payment_id: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    phoneNumber: {
      first: string;
      middle: string;
      last: string;
    };
    email: string;
  };
}

const props = defineProps<IPayBtnProps>();
defineEmits(['on-click-pay']);
defineOptions({ name: 'PayBtn' });
</script>

<template>
  <TextBtn type="submit" text="결제" :disabled="!customer.firstName || !customer.lastName || !customer.email || Object.values(customer.phoneNumber).some((val) => !val)" @click="$emit('on-click-pay')" />
</template>

<style lang="scss" scoped></style>
