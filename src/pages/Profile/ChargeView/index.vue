<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { useGetAuthMe } from '@/features/auth/api/getAuthme';
import { IPostOrderCloseRes } from '@/features/order/api/postOrderClose';
import CustomerInfoModal from '@/features/order/CustomerInfoModal/index.vue';
import PayResultModal from '@/features/order/PayResultModal/index.vue';
import SelectCreditModal from '@/features/order/SelectCreditModal/index.vue';
// import SubscriptionStateChip from '@/features/user/SubscriptionStateChip/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

import TokenCountChip from '../TokenCountChip/index.vue';

interface IChargeViewProps {
  paymentCompleted: boolean;
}

const props = defineProps<IChargeViewProps>();
defineOptions({ name: 'ChargeView' });

const alertStore = useAlertStore();

const { refetch: getAuthMe, data: userInfo } = useGetAuthMe();

const selectedProduct = ref<{ product_id: number; credits: number; price: number; currency: string; payment_id: string } | null>(null);
const payResult = ref<{ orderedProduct: string; orderCloseResult: IPostOrderCloseRes['data'] | null }>({ orderedProduct: '', orderCloseResult: null });

const showSelectCreditModal = ref(false);
const changeShowSelectCreditModal = (state: boolean) => (showSelectCreditModal.value = state);

const showCustomerInfoModal = ref(false);
const openCustomerInfoModal = (product: { product_id: number; credits: number; price: number; currency: string; payment_id: string }) => {
  showCustomerInfoModal.value = true;
  selectedProduct.value = product;
  changeShowSelectCreditModal(false);
};
const closeCustomerInfoModal = () => {
  showCustomerInfoModal.value = false;
  selectedProduct.value = null;
};

const showPayResultModal = ref(false);
const openPayResultModal = (data: IPostOrderCloseRes['data']) => {
  payResult.value.orderedProduct = `${selectedProduct.value?.credits}건 / ${formatKorNumber(selectedProduct.value?.price)}원`;
  payResult.value.orderCloseResult = data;

  closeCustomerInfoModal();
  showPayResultModal.value = true;

  handleGetAuthMe();
};

const closePayResultModal = () => {
  payResult.value = { orderedProduct: '', orderCloseResult: null };
  showPayResultModal.value = false;
};

const handleGetAuthMe = async () => {
  try {
    await getAuthMe();
    if (userInfo.value === undefined) return;
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

onMounted(handleGetAuthMe);
watch(
  () => props.paymentCompleted,
  () => {
    if (!props.paymentCompleted) return;
    handleGetAuthMe();
  }
);
</script>

<template>
  <div class="charge-view">
    <!-- <SubscriptionStateChip /> -->
    <TokenCountChip :credit="userInfo?.data.profile.credit" @on-select-chart="changeShowSelectCreditModal(true)" />
  </div>

  <SelectCreditModal :show-modal="showSelectCreditModal" @close="changeShowSelectCreditModal(false)" @next="openCustomerInfoModal" />
  <CustomerInfoModal :show-modal="showCustomerInfoModal" :selected-product="selectedProduct" @close="closeCustomerInfoModal" @on-pay-result="openPayResultModal" />
  <PayResultModal :show-modal="showPayResultModal" :pay-result="payResult" @close="closePayResultModal" />
</template>

<style lang="scss" scoped>
.charge-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 30px 40px 30px;
  border: 1px solid $gray_d;

  @include mobile {
    padding: 30px 20px;
  }
}
</style>
