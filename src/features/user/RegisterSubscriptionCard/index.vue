<script setup lang="ts">
import { onMounted } from 'vue';

import { useGetSubscriptionProducts } from '@/features/products/api/getSubscriptionProducts';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

import RegisterSubscriptionBtn from '../RegisterSubscriptionBtn/index.vue';

defineOptions({ name: 'RegisterSubscriptionCard' });

const alertStore = useAlertStore();

const { refetch: getSubscriptionProducts, data: subscriptionProducts } = useGetSubscriptionProducts();

const handleGetSubscriptionProducts = async () => {
  try {
    await getSubscriptionProducts();
    if (subscriptionProducts.value === undefined) return;
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error: (err as Err).response.data.error,
      error_code: (err as Err).response.data.error_code
    });
  }
};

onMounted(handleGetSubscriptionProducts);
</script>

<template>
  <div class="register-subscription-card">
    <p class="notice">현재 등록된 자동 충전이 없습니다.</p>
    <div class="subscription-product-chip">
      <RegisterSubscriptionBtn :product-id="subscriptionProducts?.data[0].product_id" :text="subscriptionProducts?.data[0].name" />
      <div class="sub-desc">
        <span> {{ subscriptionProducts?.data[0].credits }}건 / {{ formatKorNumber(subscriptionProducts?.data[0].price) }}원 </span>
        <span> 댓글 분류 잔여 건수 {{ subscriptionProducts?.data[0].trigger.split('-')[1] }}건 이하 시 자동결제 </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-subscription-card {
  .notice {
    width: 180px;
    height: 56px;
    text-align: center;
    align-content: center;
    margin-bottom: 20px;

    @include fontStyle(12px, 400, $gray_7);

    @include mobile {
      height: 10px;
      margin-bottom: 10px;
    }
  }

  .subscription-product-chip {
    display: flex;
    gap: 14px;
    align-items: center;
    flex-wrap: wrap;

    @include mobile {
      gap: 6px;
      margin-bottom: 20px;
    }

    .text-btn {
      height: 40px;

      @include fontStyle(16px, 600, $white);
    }

    .sub-desc {
      display: flex;
      flex-direction: column;
      @include fontStyle(12px, 400, $key_color);
    }
  }
}
</style>
