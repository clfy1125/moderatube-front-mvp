<script setup lang="ts">
import CloseModalBtn from '@/shared/components/btns/CloseModalBtn/index.vue';
import TextBtn from '@/shared/components/btns/TextBtn/index.vue';
import { IModalProps } from '@/shared/components/modals/BaseModal/index.vue';

interface IPayResultModalProps extends IModalProps {
  payResult: {
    orderedProduct: string;
    orderCloseResult: {
      order_id: number;
      payment_id: string;
      tx_id: string;
      status: string;
      is_paid: boolean;
      payment_status: string;
      updated_at: string;
      message: string;
    } | null;
  };
}

defineProps<IPayResultModalProps>();
defineEmits(['close']);
defineOptions({ name: 'PayResultModal' });
</script>

<template>
  <Teleport to="body">
    <modal class-name="pay-result" :show-modal="showModal" @close="$emit('close')">
      <CloseModalBtn @on-click-btn="onClose" />
      <div class="title">결제 완료</div>
      <div class="notice">
        <div>{{ payResult.orderedProduct }}</div>
        <div v-if="payResult.orderCloseResult">{{ payResult.orderCloseResult.message }}</div>
      </div>
      <div class="btns">
        <TextBtn text="확인" @click="$emit('close')" />
      </div>
    </modal>
  </Teleport>
</template>

<style lang="scss">
.pay-result {
  display: flex;
  flex-direction: column;
  padding: 20px;

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

  .notice {
    text-align: center;

    @include fontStyle(14px, 400);
  }

  .btns {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 20px;

    .text-btn {
      height: 30px;
    }
  }
}
</style>
