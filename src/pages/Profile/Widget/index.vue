<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import LogoutBtn from '@/features/auth/LogoutBtn/index.vue';
import ConfigBtnsCard from '@/features/config/ConfigBtnsCard/index.vue';
import { usePostOrderClose } from '@/features/order/api/postOrderClose';
import RegisterCardModal from '@/features/order/SelectCreditModal/index.vue';
import PageFooter from '@/shared/components/Footer/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';

import ChargeView from '../ChargeView/index.vue';
import PayMethodView from '../PayMethodView/index.vue';

defineOptions({ name: 'ProfileWidget' });

const router = useRouter();
const route = useRoute();

const { mutateAsync: postOrderClose } = usePostOrderClose();
const alertStore = useAlertStore();

const paymentCompleted = ref(false);

const showRegisterCardModal = ref(false);

const handlePostOrderClose = async (paymentId: string) => {
  try {
    const result = await postOrderClose({ payment_id: paymentId });

    alertStore.changeAlert({
      open: true,
      error_code: '주문 결과',
      error: result.data.message
    });

    paymentCompleted.value = true;
  } catch (err: any) {
    alertStore.changeAlert({
      open: true,
      error_code: err.response?.data?.error_code,
      error: err.response?.data?.error ?? '결제 후처리 중 오류가 발생했습니다.'
    });

    paymentCompleted.value = false;
  } finally {
    router.replace({ path: '/app/profile', query: {} });
  }
};

const handleMobilePaymentRedirectCallback = async () => {
  const routeQuery = route.query as Record<string, string>;

  const paymentId = routeQuery.paymentId;
  const code = routeQuery.code;
  const message = routeQuery.message;

  if (code) {
    alertStore.changeAlert({
      open: true,
      error_code: code,
      error: message ?? '결제를 실패했습니다. 다시 시도해주세요.'
    });

    router.replace({ path: '/app/profile', query: {} });

    return;
  }

  if (!paymentId) return router.replace({ path: '/app/profile', query: {} });

  handlePostOrderClose(paymentId);
};

onMounted(handleMobilePaymentRedirectCallback);
watch(() => route.fullPath, handleMobilePaymentRedirectCallback);
</script>

<template>
  <div class="profile-widget">
    <button class="history-btn" @click="() => router.replace({ name: 'History' })">
      사용내역
      <div class="arrow-icon"></div>
    </button>

    <div class="upper-part">
      <div>
        <div class="category-tab">충전 정보</div>
        <ChargeView :payment-completed="paymentCompleted" />
      </div>

      <div>
        <div class="category-tab">결제 수단</div>
        <PayMethodView />
      </div>
    </div>

    <div class="lower-part">
      <LogoutBtn />
      <ConfigBtnsCard />
    </div>

    <PageFooter />
  </div>

  <RegisterCardModal :show-modal="showRegisterCardModal" />
</template>

<style lang="scss" scoped>
.profile-widget {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1210px;
  height: max-content;
  padding: 30px 40px;

  @include tablet {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 4%;
    padding-right: 4%;
  }

  .history-btn {
    position: absolute;
    top: 45px;
    right: 40px;
    display: flex;
    gap: 6px;
    width: fit-content;
    background-color: transparent;

    @include fontStyle(14px, 400, $gray_3);

    @include tablet {
      top: 30px;
      right: 4%;
    }

    .arrow-icon {
      flex-shrink: 0;
      width: 14px;
      height: 14px;
      transform: rotate(180deg);
      background-position: center;
      background-repeat: no-repeat;
      background-image: url('@/shared/assets/arrow-left.svg');
    }
  }

  .category-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    border-bottom: 2px solid $key_color;

    @include fontStyle(16px, 600, $key_color);
  }

  .upper-part {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 80px;
    margin-bottom: 50px;
  }
}
</style>
