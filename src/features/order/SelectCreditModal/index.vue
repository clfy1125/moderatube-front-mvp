<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useGetPaymentsProducts } from '@/features/products/api/getPaymentsProducts';
import CloseModalBtn from '@/shared/components/btns/CloseModalBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import IsPending from '@/shared/components/IsPending/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';
import { formatKorNumber } from '@/shared/utils/formatKorNumber';

import { usePostOrderOpen } from '../api/postOrderOpen';

defineProps<IModalProps>();
const emits = defineEmits(['close', 'next']);
defineOptions({ name: 'SelectCreditModal' });

const { refetch: getPaymentsProducts, data: paymentsProducts, isLoading: loadingGetPaymentsProducts } = useGetPaymentsProducts();
const { mutateAsync: postOrderOpen, data: orderOpenResult } = usePostOrderOpen();

const alertStore = useAlertStore();

const items = ref<{ product_id: number; credits: number; price: number; currency: string }[]>([]);
const selectedProductId = ref(1);

const onClose = () => {
  selectedProductId.value = 1;
  emits('close');
};

const handlePostOrderOpen = async () => {
  try {
    await postOrderOpen({ productId: selectedProductId.value });
    if (orderOpenResult.value === undefined) return;

    const selectedProduct = items.value.find((item) => item.product_id === selectedProductId.value);
    if (selectedProduct === undefined) return;

    if (orderOpenResult.value.success) emits('next', { ...selectedProduct, payment_id: orderOpenResult.value.data.payment_id });
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

const handleGetPaymentsProducts = async () => {
  try {
    await getPaymentsProducts();
    if (paymentsProducts.value === undefined) return;
    items.value = paymentsProducts.value.data;
  } catch (err) {
    alertStore.changeAlert({ open: true, error: (err as Err).response.data.error, error_code: (err as Err).response.data.error_code });
  }
};

onMounted(handleGetPaymentsProducts);
</script>

<template>
  <Teleport to="body">
    <modal class-name="select-credit" :show-modal="showModal" @close="onClose">
      <CloseModalBtn @on-click-btn="onClose" />
      <div class="title">댓글 검사 건수 충전</div>

      <div v-if="loadingGetPaymentsProducts" class="loading">
        <IsPending />
      </div>
      <ul v-else class="credit-list">
        <li v-for="(item, index) in items" :key="index" class="item-row" @click="() => (selectedProductId = item.product_id)">
          <button :class="`check-btn ${selectedProductId === item.product_id && 'active'}`"></button>
          <div :class="`credit-desc-chip ${selectedProductId === item.product_id && 'active'}`">{{ item.credits }}건/ {{ formatKorNumber(item.price) }}원</div>
        </li>
      </ul>

      <div class="btns-part">
        <TextBtn text="다음" @click="handlePostOrderOpen" />
        <TextBtn class-name="second" text="취소" @click="onClose" />
      </div>
    </modal>
  </Teleport>
</template>

<style lang="scss">
.select-credit {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 40px 20px;
  overflow: hidden;

  @include mobile {
    width: 90%;
    max-height: 65%;
  }

  .title {
    flex-shrink: 0;
    text-align: center;
    margin-bottom: 20px;

    @include fontStyle(14px, 600);
  }

  .loading {
    width: 186px;

    @include mobile {
      width: 100%;
    }
  }

  .credit-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left: 60px;
    margin-right: 60px;

    @include mobile {
      margin-left: 0px;
      margin-right: 0px;
      margin-bottom: 30px;
      overflow-y: auto;
      grid-template-columns: repeat(1, 1fr);
    }

    .item-row {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 186px;
      margin-bottom: 20px;
      cursor: pointer;

      &:nth-of-type(1),
      &:nth-of-type(3) {
        margin-right: 20px;
      }

      @include mobile {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 10px;

        &:nth-of-type(1),
        &:nth-of-type(3) {
          margin-right: 0px;
        }
      }

      .check-btn {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        background-color: transparent;
        background-image: url('@/shared/assets/radio-default-icon.svg');

        &.active {
          background-image: url('@/shared/assets/radio-on-icon.svg');
        }
      }

      .credit-desc-chip {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 160px;
        height: 50px;
        border: 1px solid $gray_c;
        border-radius: 2px;
        user-select: none;

        @include fontStyle(14px, 400, $gray_2);

        &.active {
          border-color: $key_color;
        }
      }
    }
  }

  .btns-part {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    gap: 20px;

    .text-btn {
      width: 60px;
      height: 30px;
    }
  }
}
</style>
