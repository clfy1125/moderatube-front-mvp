<script setup lang="ts">
import { reactive } from 'vue';

import PortOne, { PaymentCurrency, PaymentPayMethod, WindowType } from '@portone/browser-sdk/v2';

import PayBtn from '@/features/payment/PayBtn/index.vue';
import CloseModalBtn from '@/shared/components/btns/CloseModalBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';
import { useAlertStore } from '@/shared/store/useAlertStore';
import { Err } from '@/shared/types/Error';
import isValidEmail from '@/shared/utils/isValidEmail';
import { onlyNumberRegex } from '@/shared/utils/regex';

import { IPostOrderCloseRes, usePostOrderClose } from '../api/postOrderClose';

const LOCAL_URL = import.meta.env.VITE_LOCAL;
const DEPLOY_URL = import.meta.env.VITE_DEPLOY;
const storeId = import.meta.env.VITE_STORE_ID;
const channelKey = import.meta.env.VITE_CHANNEL_KEY;

type CustomerInfoModalEmits = {
  (e: 'close'): void;
  (e: 'on-pay-result', data: IPostOrderCloseRes['data']): void;
};

interface ICustomerInfoModalProps extends IModalProps {
  selectedProduct: { product_id: number; credits: number; price: number; currency: string; payment_id: string } | null;
}

const props = defineProps<ICustomerInfoModalProps>();
const emit = defineEmits<CustomerInfoModalEmits>();
defineOptions({ name: 'CustomerInfoModal' });

const alertStore = useAlertStore();
const { mutateAsync: postOrderClose, data: orderCloseResult } = usePostOrderClose();

const customer = reactive({ firstName: '', lastName: '', phoneNumber: { first: '', middle: '', last: '' }, email: '' });

const onClose = () => {
  customer.firstName = '';
  customer.lastName = '';
  customer.phoneNumber.first = '';
  customer.phoneNumber.middle = '';
  customer.phoneNumber.last = '';
  customer.email = '';

  emit('close');
};

/** 주문완료처리 요청 */
const handlePostOrderClose = async (paymentId: string) => {
  try {
    await postOrderClose({ payment_id: paymentId });
    if (orderCloseResult.value === undefined) return;

    if (orderCloseResult.value.success) emit('on-pay-result', orderCloseResult.value.data);
  } catch (err) {
    alertStore.changeAlert({
      open: true,
      error_code: (err as Err).response.data.error_code,
      error: (err as Err).response.data.error
    });
  }
};

/** 결제 요청 */
const handleRequestPayment = async () => {
  if (!customer.firstName || !customer.lastName || !customer.email || Object.values(customer.phoneNumber).some((val) => !val)) {
    alertStore.changeAlert({
      open: true,
      error_code: '',
      error: '결제 정보를 모두 입력해야합니다.'
    });

    return;
  }

  if (!isValidEmail(customer.email)) {
    alertStore.changeAlert({
      open: true,
      error_code: '',
      error: '이메일 양식이 올바르지 않습니다.'
    });

    return;
  }

  if (!props.selectedProduct) {
    alertStore.changeAlert({
      open: true,
      error_code: '',
      error: '선택한 주문정보가 없습니다.'
    });

    return;
  }

  const params = {
    storeId: storeId,
    channelKey: channelKey,
    paymentId: props.selectedProduct.payment_id,
    orderName: `${props.selectedProduct.credits} 크레딧`,
    totalAmount: props.selectedProduct.price,
    currency: PaymentCurrency.KRW,
    payMethod: PaymentPayMethod.CARD,
    customer: {
      fullName: customer.lastName + customer.firstName.trim(),
      email: customer.email.trim(),
      phoneNumber: (customer.phoneNumber.first + customer.phoneNumber.middle + customer.phoneNumber.last).trim()
    },
    windowType: {
      // pc: WindowType.POPUP,
      mobile: WindowType.REDIRECTION // 모바일이라면 리다이렉트
    },
    redirectUrl: `${import.meta.env.MODE === 'development' ? LOCAL_URL : DEPLOY_URL}/profile`
  };

  try {
    const result = await PortOne.requestPayment(params);
    if (result === undefined) return;

    if (result.code) {
      alertStore.changeAlert({
        open: true,
        error_code: result.code,
        error: result.message ?? '결제를 실패했습니다. 잠시 후 다시 시도해주세요.'
      });

      return;
    }

    handlePostOrderClose(props.selectedProduct.payment_id);
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <Teleport to="body">
    <modal class-name="customer-info" :show-modal="showModal" @close="onClose">
      <CloseModalBtn @on-click-btn="onClose" />
      <div class="title">결제</div>

      <form @submit.prevent="handleRequestPayment">
        <div class="customer-fields">
          <div class="name-part">
            <input v-model="customer.lastName" type="text" placeholder="성" />
            <input v-model="customer.firstName" type="text" placeholder="이름" />
          </div>
          <div class="phone-part">
            <input v-model="customer.phoneNumber.first" type="text" placeholder="010" maxlength="3" @input="(e: Event) => (customer.phoneNumber.first = (e.target as HTMLInputElement).value.replace(onlyNumberRegex, ''))" />
            <div class="division">-</div>
            <input v-model="customer.phoneNumber.middle" type="text" maxlength="4" @input="(e) => (customer.phoneNumber.middle = (e.target as HTMLInputElement).value.replace(onlyNumberRegex, ''))" />
            <div class="division">-</div>
            <input v-model="customer.phoneNumber.last" type="text" maxlength="4" @input="(e) => (customer.phoneNumber.last = (e.target as HTMLInputElement).value.replace(onlyNumberRegex, ''))" />
          </div>

          <input v-model="customer.email" type="text" placeholder="이메일" />
        </div>

        <div class="btns-part">
          <PayBtn v-if="selectedProduct" :product="selectedProduct" :customer="customer" @on-click-pay="handleRequestPayment" />
          <TextBtn class-name="second" text="취소" @click="onClose" />
        </div>
      </form>
    </modal>
  </Teleport>
</template>

<style lang="scss">
.customer-info {
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

  .customer-fields {
    width: 420px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 60px;
    padding-right: 60px;

    @include mobile {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }

    input {
      border: 1px solid $gray_c;
      border-radius: 2px;
      height: 40px;
      padding-left: 10px;
      padding-right: 10px;
      text-overflow: ellipsis;
      overflow: hidden;

      @include fontStyle(14px, 600);

      &::placeholder {
        color: $gray_a;
      }
    }

    .name-part {
      display: flex;
      gap: 10px;

      input {
        width: 50%;
      }
    }

    .phone-part {
      display: flex;

      input {
        width: 33%;
      }

      .division {
        align-content: center;
        padding-left: 10px;
        padding-right: 10px;
        color: $gray_2;
      }
    }
  }

  .btns-part {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;

    .text-btn {
      width: 60px;
      height: 30px;
    }
  }
}
</style>
